import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { AmuletoDeForca } from './src/Decorator/AmuletoDeForca';
import { Entidade } from './src/Factory/Entidade';
import { EntidadeFactory } from './src/Factory/EntidadeFactory';
import { TipoEntidadeEnum } from './src/Factory/TipoEntidadeEnum';
import { MestreDeJogo } from './src/Observer/MestreDeJogo';
import { BattleLogger } from './src/Singleton/BattleLogger';
import { AtaqueFisico } from './src/Strategy/AtaqueFisico';
import { AtaqueParanormal } from './src/Strategy/Strategy';
import { TipoDano } from './src/Strategy/EstrategiaAtaque';
import { COLORS, gameStyles } from './src/styles/theme';

interface InimigoPreset {
  nome: string;
  vidaMax: number;
  emoji: string;
  estrategia: TipoDano;
}

const INIMIGOS: InimigoPreset[] = [
  { nome: 'Zumbi de Sangue', vidaMax: 50, emoji: '🧟', estrategia: 'FISICO' },
  { nome: 'Anjo Decaído', vidaMax: 80, emoji: '👁️', estrategia: 'PARANORMAL' },
  { nome: 'Relíquia do Abismo', vidaMax: 120, emoji: '💀', estrategia: 'PARANORMAL' },
];

const VIDA_MAX_AGENTE = 100;

export default function App() {
  const [indiceInimigo, setIndiceInimigo] = useState<number>(0);
  const [estrategiaAtiva, setEstrategiaAtiva] = useState<TipoDano>('FISICO');
  const [amuletosEquipados, setAmuletosEquipados] = useState<number>(0);
  const [, setTick] = useState<number>(0);

  const criarCombate = useCallback((idxInimigo: number) => {
    const logger = BattleLogger.getInstancia();
    logger.limpar();

    const preset = INIMIGOS[idxInimigo] ?? INIMIGOS[0]!;
    const estrategiaAgente = new AtaqueFisico();
    const estrategiaMonstro =
      preset.estrategia === 'PARANORMAL' ? new AtaqueParanormal() : new AtaqueFisico();

    const novoAgente = EntidadeFactory.criarEntidade(
      TipoEntidadeEnum.AGENTE,
      'Investigador',
      VIDA_MAX_AGENTE,
      estrategiaAgente
    );

    const novoMonstro = EntidadeFactory.criarEntidade(
      TipoEntidadeEnum.CRIATURA,
      preset.nome,
      preset.vidaMax,
      estrategiaMonstro
    );

    const mestre = new MestreDeJogo();
    (novoAgente as any).inscrever(mestre);
    (novoMonstro as any).inscrever(mestre);

    logger.log(`Combate iniciado: ${novoAgente.getNome()} vs ${novoMonstro.getNome()}`);

    return { novoAgente, novoMonstro };
  }, []);

  const [{ novoAgente: agenteInicial, novoMonstro: monstroInicial }] = useState(() =>
    criarCombate(0)
  );

  const [agente, setAgente] = useState<Entidade>(agenteInicial);
  const [monstro, setMonstro] = useState<Entidade>(monstroInicial);

  const forcarAtualizacao = () => setTick((t) => t + 1);

  const reiniciarCombate = (novoIndice: number = indiceInimigo) => {
    const { novoAgente, novoMonstro } = criarCombate(novoIndice);
    setIndiceInimigo(novoIndice);
    setAgente(novoAgente);
    setMonstro(novoMonstro);
    setEstrategiaAtiva('FISICO');
    setAmuletosEquipados(0);
    forcarAtualizacao();
  };

  const alterarEstrategia = (tipo: TipoDano) => {
    setEstrategiaAtiva(tipo);
    const novaEstrategia =
      tipo === 'PARANORMAL' ? new AtaqueParanormal() : new AtaqueFisico();
    agente.setEstrategia?.(novaEstrategia);
    BattleLogger.getInstancia().log(
      `${agente.getNome()} mudou estratégia para ${
        tipo === 'PARANORMAL' ? 'Ritual Paranormal (2d10)' : 'Ataque Físico (1d20)'
      }.`
    );
    forcarAtualizacao();
  };

  const equiparAmuleto = () => {
    if (combateEncerrado) return;
    const agenteDecorado = new AmuletoDeForca(agente);
    setAgente(agenteDecorado);
    setAmuletosEquipados((qtd) => qtd + 1);
    BattleLogger.getInstancia().log(
      `${agente.getNome()} equipou Amuleto de Força (+5 ATQ Decorator)!`
    );
    forcarAtualizacao();
  };

  const executarTurno = () => {
    if (combateEncerrado) return;

    // Turno do Agente atacando o monstro
    const danoAgente = agente.atacar(monstro);
    monstro.receberDano(danoAgente);

    // Contra-ataque da Criatura atacando o agente se ainda estiver viva
    if (monstro.getVida() > 0) {
      const danoMonstro = monstro.atacar(agente);
      agente.receberDano(danoMonstro);
    }

    forcarAtualizacao();
  };

  const vidaAgente = agente.getVida();
  const vidaMonstro = monstro.getVida();
  const presetAtual = INIMIGOS[indiceInimigo] ?? INIMIGOS[0]!;
  const pctAgente = Math.max(0, Math.min(100, (vidaAgente / VIDA_MAX_AGENTE) * 100));
  const pctMonstro = Math.max(0, Math.min(100, (vidaMonstro / presetAtual.vidaMax) * 100));
  const combateEncerrado = vidaAgente <= 0 || vidaMonstro <= 0;
  const logs = BattleLogger.getInstancia().getLogs().slice().reverse();

  const tipoAgente = agente.getTipoAtaque?.() ?? estrategiaAtiva;
  const tipoMonstro = monstro.getTipoAtaque?.() ?? presetAtual.estrategia;

  const atacanteReduzido =
    (tipoAgente === 'PARANORMAL' && tipoMonstro === 'FISICO') ||
    (tipoAgente === 'FISICO' && tipoMonstro === 'PARANORMAL');

  return (
    <SafeAreaView style={gameStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgDeep} />
      <ScrollView contentContainerStyle={gameStyles.scrollContent}>
        {/* Header estilo RPG Roxo Escuro */}
        <View style={gameStyles.headerContainer}>
          <View style={gameStyles.headerBadge}>
            <Text style={gameStyles.headerBadgeText}>ORDEM ARQUITETURAL • RPG</Text>
          </View>
          <Text style={gameStyles.title}>⚔️ SIMULADOR PARANORMAL</Text>
          <Text style={gameStyles.subtitle}>
            Factory • Strategy • Decorator • Observer • Singleton
          </Text>
        </View>

        {/* Seletor de Criatura (Factory Method) */}
        <View style={gameStyles.sectionCard}>
          <View style={gameStyles.sectionHeaderRow}>
            <Text style={gameStyles.sectionTitle}>INVOCAR CRIATURA</Text>
            <View style={gameStyles.patternPill}>
              <Text style={gameStyles.patternPillText}>Factory Method</Text>
            </View>
          </View>
          <View style={gameStyles.strategyRow}>
            {INIMIGOS.map((inimigo, idx) => {
              const ativo = idx === indiceInimigo;
              return (
                <TouchableOpacity
                  key={inimigo.nome}
                  style={[
                    gameStyles.strategyButton,
                    ativo && gameStyles.strategyButtonActive,
                  ]}
                  onPress={() => reiniciarCombate(idx)}
                  activeOpacity={0.8}
                >
                  <Text style={{ fontSize: 20 }}>{inimigo.emoji}</Text>
                  <Text style={gameStyles.strategyButtonTitle} numberOfLines={1}>
                    {inimigo.nome.split(' ')[0]}
                  </Text>
                  <Text style={gameStyles.strategyButtonDesc}>
                    {inimigo.vidaMax} HP • {inimigo.estrategia}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Arena de Batalha */}
        <View style={gameStyles.arenaContainer}>
          {/* Card do Agente */}
          <View style={gameStyles.fighterCard}>
            <View style={gameStyles.fighterCardHeader}>
              <View style={gameStyles.fighterIdentity}>
                <View style={gameStyles.avatarBox}>
                  <Text style={gameStyles.avatarEmoji}>🕵️</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={gameStyles.fighterName}>{agente.getNome()}</Text>
                  <View style={gameStyles.fighterRoleRow}>
                    <View style={gameStyles.roleTag}>
                      <Text style={gameStyles.roleTagText}>AGENTE • {tipoAgente}</Text>
                    </View>
                    {amuletosEquipados > 0 && (
                      <View style={gameStyles.amuletBadge}>
                        <Text style={gameStyles.amuletBadgeText}>
                          📿 Amuleto x{amuletosEquipados} (+{amuletosEquipados * 5})
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <Text style={gameStyles.hpNumbers}>
                {vidaAgente} / {VIDA_MAX_AGENTE} HP
              </Text>
            </View>
            <View style={gameStyles.hpBarTrack}>
              <View style={[gameStyles.hpBarFillHero, { width: `${pctAgente}%` }]} />
            </View>
          </View>

          <View style={gameStyles.vsDivider}>
            <View style={gameStyles.vsPill}>
              <Text style={gameStyles.vsText}>VERSUS</Text>
            </View>
          </View>

          {/* Card da Criatura */}
          <View style={[gameStyles.fighterCard, gameStyles.fighterCardBoss]}>
            <View style={gameStyles.fighterCardHeader}>
              <View style={gameStyles.fighterIdentity}>
                <View style={[gameStyles.avatarBox, gameStyles.avatarBoxBoss]}>
                  <Text style={gameStyles.avatarEmoji}>{presetAtual.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={gameStyles.fighterName}>{monstro.getNome()}</Text>
                  <View style={gameStyles.fighterRoleRow}>
                    <View style={[gameStyles.roleTag, { borderColor: COLORS.crimson }]}>
                      <Text style={[gameStyles.roleTagText, { color: '#FF8FA3' }]}>
                        CRIATURA • {tipoMonstro}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={gameStyles.hpNumbers}>
                {vidaMonstro} / {presetAtual.vidaMax} HP
              </Text>
            </View>
            <View style={gameStyles.hpBarTrack}>
              <View style={[gameStyles.hpBarFillBoss, { width: `${pctMonstro}%` }]} />
            </View>
          </View>
        </View>

        {/* Banner de Fim de Combate (Observer MestreDeJogo) */}
        {combateEncerrado && (
          <View style={gameStyles.victoryBanner}>
            <Text style={gameStyles.victoryTitle}>
              {vidaMonstro <= 0 ? '🏆 CRIATURA DERROTADA!' : '💀 AGENTE CAIU EM COMBATE!'}
            </Text>
            <Text style={gameStyles.victorySubtitle}>
              O Mestre de Jogo notificou o fim da batalha via padrão Observer.
            </Text>
          </View>
        )}

        {/* Seleção de Estratégia (Strategy Pattern) */}
        <View style={gameStyles.sectionCard}>
          <View style={gameStyles.sectionHeaderRow}>
            <Text style={gameStyles.sectionTitle}>ESTRATÉGIA DE ATAQUE</Text>
            <View style={gameStyles.patternPill}>
              <Text style={gameStyles.patternPillText}>Strategy</Text>
            </View>
          </View>
          <View style={gameStyles.strategyRow}>
            <TouchableOpacity
              style={[
                gameStyles.strategyButton,
                estrategiaAtiva === 'FISICO' && gameStyles.strategyButtonActive,
              ]}
              onPress={() => alterarEstrategia('FISICO')}
              disabled={combateEncerrado}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 20 }}>🗡️</Text>
              <Text style={gameStyles.strategyButtonTitle}>Ataque Físico</Text>
              <Text style={gameStyles.strategyButtonDesc}>
                1d20 {tipoMonstro === 'PARANORMAL' ? '(½ vs Paranormal)' : '(Normal)'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                gameStyles.strategyButton,
                estrategiaAtiva === 'PARANORMAL' && gameStyles.strategyButtonActive,
              ]}
              onPress={() => alterarEstrategia('PARANORMAL')}
              disabled={combateEncerrado}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 20 }}>🔮</Text>
              <Text style={gameStyles.strategyButtonTitle}>Ritual Paranormal</Text>
              <Text style={gameStyles.strategyButtonDesc}>
                2d10 {tipoMonstro === 'FISICO' ? '(½ vs Físico)' : '(Normal)'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Painel de Ações e Equipamento (Decorator Pattern) */}
        <View style={gameStyles.sectionCard}>
          <View style={gameStyles.sectionHeaderRow}>
            <Text style={gameStyles.sectionTitle}>COMANDOS DE TURNO</Text>
            <View style={gameStyles.patternPill}>
              <Text style={gameStyles.patternPillText}>Decorator</Text>
            </View>
          </View>

          <View style={gameStyles.actionsGrid}>
            <TouchableOpacity
              style={[
                gameStyles.primaryAttackBtn,
                combateEncerrado && gameStyles.primaryAttackBtnDisabled,
              ]}
              onPress={executarTurno}
              disabled={combateEncerrado}
              activeOpacity={0.85}
            >
              <Text style={gameStyles.primaryAttackBtnText}>⚡ EXECUTAR ATAQUE</Text>
              <Text style={gameStyles.primaryAttackSubtext}>
                {estrategiaAtiva === 'PARANORMAL'
                  ? `Ritual (2d10${atacanteReduzido ? ' ÷ 2 [alvo físico]' : ''}) + ${amuletosEquipados * 5} amuleto`
                  : `Físico (1d20${atacanteReduzido ? ' ÷ 2 [alvo paranormal]' : ''}) + ${amuletosEquipados * 5} amuleto`}
              </Text>
            </TouchableOpacity>

            <View style={gameStyles.secondaryRow}>
              <TouchableOpacity
                style={[
                  gameStyles.decoratorBtn,
                  combateEncerrado && gameStyles.primaryAttackBtnDisabled,
                ]}
                onPress={equiparAmuleto}
                disabled={combateEncerrado}
                activeOpacity={0.8}
              >
                <Text style={gameStyles.decoratorBtnText}>📿 Equipar Amuleto</Text>
                <Text style={gameStyles.decoratorBtnSub}>+5 Dano (Decorator)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={gameStyles.resetBtn}
                onPress={() => reiniciarCombate(indiceInimigo)}
                activeOpacity={0.8}
              >
                <Text style={gameStyles.resetBtnText}>🔄 Novo Combate</Text>
                <Text style={gameStyles.resetBtnSub}>Reiniciar Arena</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Registro de Batalha (Singleton BattleLogger & Observer MestreDeJogo) */}
        <View style={gameStyles.sectionCard}>
          <View style={gameStyles.sectionHeaderRow}>
            <Text style={gameStyles.sectionTitle}>DIÁRIO DO MESTRE (LOGS)</Text>
            <View style={gameStyles.patternPill}>
              <Text style={gameStyles.patternPillText}>Singleton + Observer</Text>
            </View>
          </View>

          <ScrollView style={gameStyles.logBox} nestedScrollEnabled>
            {logs.length === 0 ? (
              <Text style={gameStyles.logEmpty}>Nenhum evento registrado ainda...</Text>
            ) : (
              logs.map((linha, idx) => {
                const isAlerta = linha.includes('[ALERTA DO MESTRE]');
                const isCritico =
                  linha.includes('crítico') ||
                  linha.includes('Amuleto') ||
                  linha.includes('resistente');
                return (
                  <View key={`${idx}-${linha}`} style={gameStyles.logEntry}>
                    <Text
                      style={[
                        gameStyles.logText,
                        isAlerta && gameStyles.logTextMasterAlert,
                        !isAlerta && isCritico && gameStyles.logTextCritical,
                      ]}
                    >
                      {linha}
                    </Text>
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
