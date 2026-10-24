import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useRef, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { CombatenteInstanciaArena } from './src/components/CombatenteCard';
import { AbaAtiva, HeaderOrdem } from './src/components/HeaderOrdem';
import {
  AmuletoCustomDecorator,
  removerTodosDecorators,
  removerUltimoDecorator,
} from './src/patterns/decorator/AmuletoCustomDecorator';
import { EntidadeFactory } from './src/patterns/factory/EntidadeFactory';
import { MestreDeJogo } from './src/patterns/observer/MestreDeJogo';
import { BattleLogger, RegistroLog } from './src/patterns/singleton/BattleLogger';
import { OfflineStorage } from './src/patterns/singleton/OfflineStorage';
import { AcaoOrdemStrategy } from './src/patterns/strategy/AcaoOrdemStrategy';
import { gameStyles } from './src/styles/theme';
import { ArenaTab } from './src/tabs/ArenaTab';
import { OficinaAcoesTab } from './src/tabs/OficinaAcoesTab';
import { OficinaAmuletosTab } from './src/tabs/OficinaAmuletosTab';
import { OficinaCombatentesTab } from './src/tabs/OficinaCombatentesTab';
import { RoladorRegrasTab } from './src/tabs/RoladorRegrasTab';
import {
  ConfigAcao,
  ConfigAmuletoDecorator,
  ConfigCombatente,
  ConfigRegrasMesa,
  ResultadoAcao,
} from './src/types/Elementos';

export default function App() {
  const storage = useMemo(() => OfflineStorage.getInstancia(), []);
  const logger = useMemo(() => BattleLogger.getInstancia(), []);
  const mestre = useMemo(() => new MestreDeJogo(), []);

  // Catálogos persistidos offline (Singleton OfflineStorage)
  const [catalogoAgentes, setCatalogoAgentes] = useState<ConfigCombatente[]>(() =>
    storage.getAgentes()
  );
  const [catalogoCriaturas, setCatalogoCriaturas] = useState<ConfigCombatente[]>(() =>
    storage.getCriaturas()
  );
  const [catalogoAcoes, setCatalogoAcoes] = useState<ConfigAcao[]>(() =>
    storage.getAcoes()
  );
  const [catalogoAmuletos, setCatalogoAmuletos] = useState<ConfigAmuletoDecorator[]>(
    () => storage.getAmuletos()
  );
  const [regras, setRegras] = useState<ConfigRegrasMesa>(() => storage.getRegras());
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('ARENA');

  // Contador para gerar UIDs únicos na Arena
  const uidCounter = useRef(1);
  const criarInstanciaArena = (
    config: ConfigCombatente,
    acoesDisp: ConfigAcao[] = catalogoAcoes
  ): CombatenteInstanciaArena => {
    const uid = `${config.tipo.toLowerCase()}_arena_${uidCounter.current++}`;
    const ent = EntidadeFactory.criarDeConfig(
      { ...config, id: uid },
      acoesDisp
    );
    ent.inscrever(mestre);
    return { uid, entidade: ent };
  };

  // Equipe de Agentes e Grupo de Criaturas ativos na Arena
  const [equipeAgentes, setEquipeAgentes] = useState<CombatenteInstanciaArena[]>(() =>
    storage
      .getAgentes()
      .slice(0, 2)
      .map((c: ConfigCombatente) => {
        const uid = `agente_arena_${uidCounter.current++}`;
        const ent = EntidadeFactory.criarDeConfig(
          { ...c, id: uid },
          storage.getAcoes()
        );
        ent.inscrever(mestre);
        return { uid, entidade: ent };
      })
  );

  const [grupoCriaturas, setGrupoCriaturas] = useState<CombatenteInstanciaArena[]>(() =>
    storage
      .getCriaturas()
      .slice(0, 2)
      .map((c: ConfigCombatente) => {
        const uid = `criatura_arena_${uidCounter.current++}`;
        const ent = EntidadeFactory.criarDeConfig(
          { ...c, id: uid },
          storage.getAcoes()
        );
        ent.inscrever(mestre);
        return { uid, entidade: ent };
      })
  );

  const [atacanteUid, setAtacanteUid] = useState<string>(
    () => equipeAgentes[0]?.uid ?? ''
  );
  const [alvoUid, setAlvoUid] = useState<string>(
    () => grupoCriaturas[0]?.uid ?? ''
  );
  const [acaoSelecionadaId, setAcaoSelecionadaId] = useState<string>(
    () => catalogoAcoes[0]?.id ?? 'acao_ataque_fisico'
  );
  const [amuletoSelecionadoId, setAmuletoSelecionadoId] = useState<string>(
    () => catalogoAmuletos[0]?.id ?? 'amuleto_forca_classico'
  );

  const [, setTick] = useState(0);
  const [ultimoResultado, setUltimoResultado] = useState<ResultadoAcao | null>(null);
  const [registrosLog, setRegistrosLog] = useState<RegistroLog[]>([]);

  const atualizarTela = () => {
    setTick((t: number) => t + 1);
    setUltimoResultado(logger.getUltimoResultado());
    setRegistrosLog(logger.getRegistrosCompletos());
  };

  const todosCombatentesArena = useMemo(
    () => [...equipeAgentes, ...grupoCriaturas],
    [equipeAgentes, grupoCriaturas]
  );

  const atacanteAtual =
    todosCombatentesArena.find(
      (c: CombatenteInstanciaArena) => c.uid === atacanteUid
    ) ??
    equipeAgentes[0] ??
    grupoCriaturas[0];

  const alvoAtual =
    todosCombatentesArena.find(
      (c: CombatenteInstanciaArena) => c.uid === alvoUid
    ) ??
    grupoCriaturas[0] ??
    equipeAgentes[0];

  const acaoAtual =
    catalogoAcoes.find((a: ConfigAcao) => a.id === acaoSelecionadaId) ??
    catalogoAcoes[0];

  // Controles de Combate na Arena
  const selecionarAtacante = (item: CombatenteInstanciaArena) => {
    setAtacanteUid(item.uid);
    setAcaoSelecionadaId(item.entidade.getEstrategia().getConfig().id);
  };

  const selecionarAlvo = (item: CombatenteInstanciaArena) => {
    setAlvoUid(item.uid);
  };

  const trocarAcaoDoAtacante = (acao: ConfigAcao) => {
    setAcaoSelecionadaId(acao.id);
    if (atacanteAtual) {
      atacanteAtual.entidade.setEstrategia(new AcaoOrdemStrategy(acao));
      atualizarTela();
    }
  };

  const executarTurnoNaArena = () => {
    if (!atacanteAtual || !alvoAtual || !acaoAtual) return;
    if (!atacanteAtual.entidade.estaVivo()) {
      logger.log(
        `⚠️ ${atacanteAtual.entidade.getNome()} está com 0 PV e não pode agir até ser curado ou revivido!`,
        'SISTEMA'
      );
      atualizarTela();
      return;
    }

    atacanteAtual.entidade.setEstrategia(new AcaoOrdemStrategy(acaoAtual));
    atacanteAtual.entidade.atacar(alvoAtual.entidade, regras);

    const atacanteEhAgente =
      atacanteAtual.entidade.getTipoEntidade() === 'AGENTE';
    const alvoEhCriatura = alvoAtual.entidade.getTipoEntidade() === 'CRIATURA';

    if (
      regras.contraAtaqueAutomatico &&
      atacanteEhAgente &&
      alvoEhCriatura &&
      acaoAtual.efeito !== 'CURA_PV' &&
      acaoAtual.efeito !== 'RECUPERAR_PE_SAN' &&
      acaoAtual.efeito !== 'BUFF_DEFESA_RD'
    ) {
      if (regras.contraAtaqueTodosVivos) {
        grupoCriaturas.forEach((criaturaItem: CombatenteInstanciaArena) => {
          if (
            criaturaItem.entidade.estaVivo() &&
            atacanteAtual.entidade.estaVivo()
          ) {
            criaturaItem.entidade.atacar(atacanteAtual.entidade, regras);
          }
        });
      } else if (alvoAtual.entidade.estaVivo()) {
        alvoAtual.entidade.atacar(atacanteAtual.entidade, regras);
      }
    }

    atualizarTela();
  };

  const equiparAmuletoNoAtacante = (amuletoConfig?: ConfigAmuletoDecorator) => {
    if (!atacanteAtual) return;
    const amuleto =
      amuletoConfig ??
      catalogoAmuletos.find(
        (a: ConfigAmuletoDecorator) => a.id === amuletoSelecionadoId
      ) ??
      catalogoAmuletos[0];
    if (!amuleto) return;

    const novaEntidadeDecorada = new AmuletoCustomDecorator(
      atacanteAtual.entidade,
      amuleto
    );

    if (atacanteAtual.entidade.getTipoEntidade() === 'AGENTE') {
      setEquipeAgentes((prev: CombatenteInstanciaArena[]) =>
        prev.map((item: CombatenteInstanciaArena) =>
          item.uid === atacanteAtual.uid
            ? { ...item, entidade: novaEntidadeDecorada }
            : item
        )
      );
    } else {
      setGrupoCriaturas((prev: CombatenteInstanciaArena[]) =>
        prev.map((item: CombatenteInstanciaArena) =>
          item.uid === atacanteAtual.uid
            ? { ...item, entidade: novaEntidadeDecorada }
            : item
        )
      );
    }

    logger.log(
      `📿 [DECORATOR] ${atacanteAtual.entidade.getNome()} equipou ${amuleto.emoji} ${amuleto.nome} (+${amuleto.bonusDanoFixo} fixo${amuleto.qtdDadosExtras > 0 ? `, +${amuleto.qtdDadosExtras}d${amuleto.faceDadoExtra}` : ''}${amuleto.bonusDefesa > 0 ? `, +${amuleto.bonusDefesa} DEF` : ''}${amuleto.bonusRD > 0 ? `, +${amuleto.bonusRD} RD` : ''}).`,
      'SISTEMA'
    );
    atualizarTela();
  };

  const removerUltimoAmuletoDoAtacante = () => {
    if (!atacanteAtual) return;
    if (atacanteAtual.entidade.getAmuletosEquipados().length === 0) return;

    const desfeita = removerUltimoDecorator(atacanteAtual.entidade);
    if (atacanteAtual.entidade.getTipoEntidade() === 'AGENTE') {
      setEquipeAgentes((prev: CombatenteInstanciaArena[]) =>
        prev.map((item: CombatenteInstanciaArena) =>
          item.uid === atacanteAtual.uid ? { ...item, entidade: desfeita } : item
        )
      );
    } else {
      setGrupoCriaturas((prev: CombatenteInstanciaArena[]) =>
        prev.map((item: CombatenteInstanciaArena) =>
          item.uid === atacanteAtual.uid ? { ...item, entidade: desfeita } : item
        )
      );
    }
    logger.log(
      `📿 ${atacanteAtual.entidade.getNome()} removeu o último amuleto equipado.`,
      'SISTEMA'
    );
    atualizarTela();
  };

  const adicionarCombatenteNaArena = (config: ConfigCombatente) => {
    const novaInst = criarInstanciaArena(config, catalogoAcoes);
    if (config.tipo === 'AGENTE') {
      setEquipeAgentes((prev: CombatenteInstanciaArena[]) => [
        ...prev,
        novaInst,
      ]);
      setAtacanteUid(novaInst.uid);
    } else {
      setGrupoCriaturas((prev: CombatenteInstanciaArena[]) => [
        ...prev,
        novaInst,
      ]);
      setAlvoUid(novaInst.uid);
    }
    logger.log(
      `➕ [FACTORY] ${config.emoji} ${config.nome} (${config.subtitulo}) entrou na Arena!`,
      'SISTEMA'
    );
    atualizarTela();
  };

  const removerDaArena = (uid: string, tipo: 'AGENTE' | 'CRIATURA') => {
    if (tipo === 'AGENTE') {
      if (equipeAgentes.length <= 1) return;
      const filtrados = equipeAgentes.filter(
        (a: CombatenteInstanciaArena) => a.uid !== uid
      );
      setEquipeAgentes(filtrados);
      if (atacanteUid === uid) setAtacanteUid(filtrados[0].uid);
      if (alvoUid === uid) setAlvoUid(filtrados[0].uid);
    } else {
      if (grupoCriaturas.length <= 1) return;
      const filtrados = grupoCriaturas.filter(
        (c: CombatenteInstanciaArena) => c.uid !== uid
      );
      setGrupoCriaturas(filtrados);
      if (alvoUid === uid) setAlvoUid(filtrados[0].uid);
      if (atacanteUid === uid) setAtacanteUid(filtrados[0].uid);
    }
    atualizarTela();
  };

  const reiniciarCombateArena = () => {
    setEquipeAgentes((prev: CombatenteInstanciaArena[]) =>
      prev.map((item: CombatenteInstanciaArena) => {
        const base = removerTodosDecorators(item.entidade);
        base.resetarStatus();
        return { ...item, entidade: base };
      })
    );
    setGrupoCriaturas((prev: CombatenteInstanciaArena[]) =>
      prev.map((item: CombatenteInstanciaArena) => {
        const base = removerTodosDecorators(item.entidade);
        base.resetarStatus();
        return { ...item, entidade: base };
      })
    );
    logger.limpar();
    logger.log(
      '🔄 Combate reiniciado! PV, PE, SAN restaurados e amuletos removidos.',
      'SISTEMA'
    );
    setUltimoResultado(null);
    setRegistrosLog(logger.getRegistrosCompletos());
    setTick((t: number) => t + 1);
  };

  return (
    <SafeAreaView style={gameStyles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={gameStyles.scrollContent}>
        <HeaderOrdem abaAtiva={abaAtiva} onSelectAba={setAbaAtiva} />

        {abaAtiva === 'ARENA' && (
          <ArenaTab
            equipeAgentes={equipeAgentes}
            grupoCriaturas={grupoCriaturas}
            catalogoAgentes={catalogoAgentes}
            catalogoCriaturas={catalogoCriaturas}
            catalogoAcoes={catalogoAcoes}
            catalogoAmuletos={catalogoAmuletos}
            atacanteAtual={atacanteAtual}
            alvoAtual={alvoAtual}
            acaoAtual={acaoAtual}
            amuletoSelecionadoId={amuletoSelecionadoId}
            regras={regras}
            ultimoResultado={ultimoResultado}
            registrosLog={registrosLog}
            onSelecionarAtacante={selecionarAtacante}
            onSelecionarAlvo={selecionarAlvo}
            onAdicionarNaArena={adicionarCombatenteNaArena}
            onRemoverDaArena={removerDaArena}
            onTrocarAcao={trocarAcaoDoAtacante}
            onExecutarTurno={executarTurnoNaArena}
            onSelecionarAmuleto={setAmuletoSelecionadoId}
            onEquiparAmuleto={() => equiparAmuletoNoAtacante()}
            onRemoverUltimoAmuleto={removerUltimoAmuletoDoAtacante}
            onReiniciarCombate={reiniciarCombateArena}
          />
        )}

        {abaAtiva === 'COMBATENTES' && (
          <OficinaCombatentesTab
            catalogoAcoes={catalogoAcoes}
            onSalvarCombatente={(novo, adicionarDireto) => {
              storage.salvarCombatente(novo);
              setCatalogoAgentes(storage.getAgentes());
              setCatalogoCriaturas(storage.getCriaturas());
              if (adicionarDireto) {
                adicionarCombatenteNaArena(novo);
                setAbaAtiva('ARENA');
              }
            }}
          />
        )}

        {abaAtiva === 'ACOES' && (
          <OficinaAcoesTab
            onSalvarAcao={(novaAcao) => {
              storage.salvarAcao(novaAcao);
              setCatalogoAcoes(storage.getAcoes());
              setAcaoSelecionadaId(novaAcao.id);
              if (atacanteAtual) {
                atacanteAtual.entidade.setEstrategia(
                  new AcaoOrdemStrategy(novaAcao)
                );
              }
              setAbaAtiva('ARENA');
            }}
          />
        )}

        {abaAtiva === 'AMULETOS' && (
          <OficinaAmuletosTab
            nomeAtacanteAtivo={atacanteAtual?.entidade.getNome() ?? 'Combatente'}
            onSalvarAmuleto={(novoAmuleto, equiparImediatamente) => {
              storage.salvarAmuleto(novoAmuleto);
              setCatalogoAmuletos(storage.getAmuletos());
              setAmuletoSelecionadoId(novoAmuleto.id);
              if (equiparImediatamente) {
                equiparAmuletoNoAtacante(novoAmuleto);
                setAbaAtiva('ARENA');
              }
            }}
          />
        )}

        {abaAtiva === 'DADOS_REGRAS' && (
          <RoladorRegrasTab
            regras={regras}
            onAlternarRegra={(chave) => {
              const atual = regras[chave];
              if (typeof atual === 'boolean') {
                setRegras(storage.atualizarRegras({ [chave]: !atual }));
              }
            }}
            onExportarJSON={() => storage.exportarJSON()}
            onImportarJSON={(json) => {
              const res = storage.importarJSON(json);
              if (res.sucesso) {
                setCatalogoAgentes(storage.getAgentes());
                setCatalogoCriaturas(storage.getCriaturas());
                setCatalogoAcoes(storage.getAcoes());
                setCatalogoAmuletos(storage.getAmuletos());
                setRegras(storage.getRegras());
              }
              return res;
            }}
            onRestaurarPadroes={() => {
              storage.restaurarPadroes();
              setCatalogoAgentes(storage.getAgentes());
              setCatalogoCriaturas(storage.getCriaturas());
              setCatalogoAcoes(storage.getAcoes());
              setCatalogoAmuletos(storage.getAmuletos());
              setRegras(storage.getRegras());
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
