import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BattleLogPanel } from '../components/BattleLogPanel';
import {
  CombatenteCard,
  CombatenteInstanciaArena,
} from '../components/CombatenteCard';
import { RaioXDanoCard } from '../components/RaioXDanoCard';
import { RegistroLog } from '../patterns/singleton/BattleLogger';
import { COLORS, gameStyles } from '../styles/theme';
import {
  calcularRelacaoElemental,
  ConfigAcao,
  ConfigAmuletoDecorator,
  ConfigCombatente,
  ConfigRegrasMesa,
  ELEMENTOS_ORDEM,
  ResultadoAcao,
} from '../types/Elementos';

interface ArenaTabProps {
  equipeAgentes: CombatenteInstanciaArena[];
  grupoCriaturas: CombatenteInstanciaArena[];
  catalogoAgentes: ConfigCombatente[];
  catalogoCriaturas: ConfigCombatente[];
  catalogoAcoes: ConfigAcao[];
  catalogoAmuletos: ConfigAmuletoDecorator[];
  atacanteAtual?: CombatenteInstanciaArena;
  alvoAtual?: CombatenteInstanciaArena;
  acaoAtual?: ConfigAcao;
  amuletoSelecionadoId: string;
  regras: ConfigRegrasMesa;
  ultimoResultado: ResultadoAcao | null;
  registrosLog: RegistroLog[];
  onSelecionarAtacante: (item: CombatenteInstanciaArena) => void;
  onSelecionarAlvo: (item: CombatenteInstanciaArena) => void;
  onAdicionarNaArena: (config: ConfigCombatente) => void;
  onRemoverDaArena: (uid: string, tipo: 'AGENTE' | 'CRIATURA') => void;
  onTrocarAcao: (acao: ConfigAcao) => void;
  onExecutarTurno: () => void;
  onSelecionarAmuleto: (id: string) => void;
  onEquiparAmuleto: () => void;
  onRemoverUltimoAmuleto: () => void;
  onReiniciarCombate: () => void;
}

export function ArenaTab({
  equipeAgentes,
  grupoCriaturas,
  catalogoAgentes,
  catalogoCriaturas,
  catalogoAcoes,
  catalogoAmuletos,
  atacanteAtual,
  alvoAtual,
  acaoAtual,
  amuletoSelecionadoId,
  regras,
  ultimoResultado,
  registrosLog,
  onSelecionarAtacante,
  onSelecionarAlvo,
  onAdicionarNaArena,
  onRemoverDaArena,
  onTrocarAcao,
  onExecutarTurno,
  onSelecionarAmuleto,
  onEquiparAmuleto,
  onRemoverUltimoAmuleto,
  onReiniciarCombate,
}: ArenaTabProps) {
  return (
    <>
      {/* EQUIPE DE AGENTES (PESSOAS) */}
      <View style={gameStyles.sectionCard}>
        <View style={gameStyles.sectionHeaderRow}>
          <Text style={gameStyles.sectionTitle}>
            🕵️ EQUIPE DE AGENTES ({equipeAgentes.length})
          </Text>
          <View style={gameStyles.patternPill}>
            <Text style={gameStyles.patternPillText}>Factory Method</Text>
          </View>
        </View>

        <View style={gameStyles.teamGrid}>
          {equipeAgentes.map((item: CombatenteInstanciaArena) => (
            <CombatenteCard
              key={item.uid}
              item={item}
              ehAtacante={atacanteAtual?.uid === item.uid}
              ehAlvo={alvoAtual?.uid === item.uid}
              podeRemover={equipeAgentes.length > 1}
              onSelecionarAtacante={onSelecionarAtacante}
              onSelecionarAlvo={onSelecionarAlvo}
              onRemover={(uid: string) => onRemoverDaArena(uid, 'AGENTE')}
            />
          ))}
        </View>

        <Text style={[gameStyles.inputLabel, { marginTop: 10 }]}>
          ➕ Adicionar Agente à Equipe:
        </Text>
        <View style={gameStyles.chipsSelectorRow}>
          {catalogoAgentes.map((ag: ConfigCombatente) => (
            <TouchableOpacity
              key={ag.id}
              style={gameStyles.chipOption}
              onPress={() => onAdicionarNaArena(ag)}
            >
              <Text style={gameStyles.chipOptionText}>
                + {ag.emoji} {ag.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* GRUPO DE CRIATURAS (MONSTROS DO OUTRO LADO) */}
      <View style={gameStyles.sectionCard}>
        <View style={gameStyles.sectionHeaderRow}>
          <Text style={gameStyles.sectionTitle}>
            👹 AMEAÇAS DO OUTRO LADO ({grupoCriaturas.length})
          </Text>
          <View style={gameStyles.patternPill}>
            <Text style={gameStyles.patternPillText}>Observer + Factory</Text>
          </View>
        </View>

        <View style={gameStyles.teamGrid}>
          {grupoCriaturas.map((item: CombatenteInstanciaArena) => (
            <CombatenteCard
              key={item.uid}
              item={item}
              ehAtacante={atacanteAtual?.uid === item.uid}
              ehAlvo={alvoAtual?.uid === item.uid}
              podeRemover={grupoCriaturas.length > 1}
              onSelecionarAtacante={onSelecionarAtacante}
              onSelecionarAlvo={onSelecionarAlvo}
              onRemover={(uid: string) => onRemoverDaArena(uid, 'CRIATURA')}
            />
          ))}
        </View>

        <Text style={[gameStyles.inputLabel, { marginTop: 10 }]}>
          ➕ Invocar Criatura na Arena:
        </Text>
        <View style={gameStyles.chipsSelectorRow}>
          {catalogoCriaturas.map((cr: ConfigCombatente) => (
            <TouchableOpacity
              key={cr.id}
              style={gameStyles.chipOption}
              onPress={() => onAdicionarNaArena(cr)}
            >
              <Text style={gameStyles.chipOptionText}>
                + {cr.emoji} {cr.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* PAINEL DE ESCOLHA DE AÇÃO / ARMA / RITUAL (STRATEGY) */}
      <View style={gameStyles.sectionCard}>
        <View style={gameStyles.sectionHeaderRow}>
          <Text style={gameStyles.sectionTitle}>
            🔮 AÇÃO DE {atacanteAtual?.entidade.getNome().toUpperCase()}
          </Text>
          <View style={gameStyles.patternPill}>
            <Text style={gameStyles.patternPillText}>Strategy</Text>
          </View>
        </View>

        <Text style={gameStyles.sectionSubtitle}>
          Atacante: {atacanteAtual?.entidade.getEmoji()}{' '}
          {atacanteAtual?.entidade.getNome()} ➔ Alvo:{' '}
          {alvoAtual?.entidade.getEmoji()} {alvoAtual?.entidade.getNome()}
        </Text>

        <View style={gameStyles.actionsGrid}>
          {catalogoAcoes.map((acao: ConfigAcao) => {
            const selecionada = acaoAtual?.id === acao.id;
            const elemMeta = ELEMENTOS_ORDEM[acao.elemento];
            const relacaoContraAlvo = alvoAtual
              ? calcularRelacaoElemental(
                  acao.elemento,
                  alvoAtual.entidade.getElemento()
                )
              : 'NEUTRO';

            return (
              <TouchableOpacity
                key={acao.id}
                style={[
                  gameStyles.actionOptionCard,
                  selecionada && gameStyles.actionOptionCardActive,
                ]}
                onPress={() => onTrocarAcao(acao)}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 6,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.textPrimary,
                      fontWeight: '900',
                      fontSize: 13,
                    }}
                  >
                    {acao.emoji} {acao.nome}
                  </Text>

                  <View
                    style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
                  >
                    <View
                      style={[
                        gameStyles.miniBadge,
                        {
                          backgroundColor: elemMeta.corFundo,
                          borderColor: elemMeta.corBorda,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          gameStyles.miniBadgeText,
                          { color: elemMeta.cor },
                        ]}
                      >
                        {elemMeta.emoji} {acao.qtdDados}d{acao.faceDado}
                        {acao.bonusFixo >= 0
                          ? `+${acao.bonusFixo}`
                          : acao.bonusFixo}
                      </Text>
                    </View>

                    {relacaoContraAlvo === 'OPRIME' &&
                      (acao.efeito === 'DANO_PV' ||
                        acao.efeito === 'DANO_SAN') && (
                        <View
                          style={[
                            gameStyles.miniBadge,
                            {
                              backgroundColor: COLORS.emeraldDark,
                              borderColor: COLORS.emerald,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              gameStyles.miniBadgeText,
                              { color: '#A7F3D0' },
                            ]}
                          >
                            🔥 OPRIME (×{regras.multiplicadorVulnerabilidade})
                          </Text>
                        </View>
                      )}

                    {relacaoContraAlvo === 'RESISTE' &&
                      (acao.efeito === 'DANO_PV' ||
                        acao.efeito === 'DANO_SAN') && (
                        <View
                          style={[
                            gameStyles.miniBadge,
                            {
                              backgroundColor: '#3B1806',
                              borderColor: COLORS.gold,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              gameStyles.miniBadgeText,
                              { color: COLORS.goldLight },
                            ]}
                          >
                            🛡️ RESISTE (×{regras.multiplicadorResistencia})
                          </Text>
                        </View>
                      )}
                  </View>
                </View>

                <Text
                  style={{
                    color: COLORS.textMuted,
                    fontSize: 11,
                    marginTop: 3,
                  }}
                >
                  Crítico {acao.margemCritico}/x{acao.multiplicadorCritico} •
                  Acerto +{acao.bonusAcerto}
                  {acao.custoPE > 0 ? ` • ${acao.custoPE} PE` : ''}
                  {acao.custoSAN > 0 ? ` • ${acao.custoSAN} SAN` : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={gameStyles.primaryAttackBtn}
          onPress={onExecutarTurno}
        >
          <Text style={gameStyles.primaryAttackBtnText}>
            ⚡ EXECUTAR: {acaoAtual?.emoji} {acaoAtual?.nome.toUpperCase()}
          </Text>
          <Text style={gameStyles.primaryAttackSubtext}>
            {atacanteAtual?.entidade.getNome()} ➔ {alvoAtual?.entidade.getNome()}{' '}
            ({acaoAtual?.qtdDados}d{acaoAtual?.faceDado}+{acaoAtual?.bonusFixo})
          </Text>
        </TouchableOpacity>
      </View>

      {/* PAINEL DE AMULETOS / DECORATORS NO ATACANTE ATIVO */}
      <View style={gameStyles.sectionCard}>
        <View style={gameStyles.sectionHeaderRow}>
          <Text style={gameStyles.sectionTitle}>
            📿 AMULETOS & MALDIÇÕES EM{' '}
            {atacanteAtual?.entidade.getNome().toUpperCase()}
          </Text>
          <View style={gameStyles.patternPill}>
            <Text style={gameStyles.patternPillText}>Decorator</Text>
          </View>
        </View>

        <View style={gameStyles.chipsSelectorRow}>
          {catalogoAmuletos.map((am: ConfigAmuletoDecorator) => {
            const ativo = amuletoSelecionadoId === am.id;
            return (
              <TouchableOpacity
                key={am.id}
                style={[
                  gameStyles.chipOption,
                  ativo && gameStyles.chipOptionActive,
                ]}
                onPress={() => onSelecionarAmuleto(am.id)}
              >
                <Text
                  style={[
                    gameStyles.chipOptionText,
                    ativo && gameStyles.chipOptionTextActive,
                  ]}
                >
                  {am.emoji} {am.nome} (+{am.bonusDanoFixo}
                  {am.qtdDadosExtras > 0
                    ? ` +${am.qtdDadosExtras}d${am.faceDadoExtra}`
                    : ''}
                  )
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[gameStyles.secondaryRow, { marginTop: 10 }]}>
          <TouchableOpacity
            style={gameStyles.goldBtn}
            onPress={onEquiparAmuleto}
          >
            <Text style={gameStyles.goldBtnText}>
              📿 Equipar Amuleto Selecionado
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={gameStyles.secondaryBtn}
            onPress={onRemoverUltimoAmuleto}
          >
            <Text style={gameStyles.secondaryBtnText}>
              ↩ Remover Último (
              {atacanteAtual?.entidade.getAmuletosEquipados().length ?? 0})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={gameStyles.secondaryBtn}
            onPress={onReiniciarCombate}
          >
            <Text style={gameStyles.secondaryBtnText}>🔄 Reiniciar Combate</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* RAIO-X DO DANO */}
      {ultimoResultado && <RaioXDanoCard resultado={ultimoResultado} />}

      {/* LOG DE BATALHA */}
      <BattleLogPanel registrosLog={registrosLog} />
    </>
  );
}
