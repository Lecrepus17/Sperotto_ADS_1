import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { EncomendaCard } from './src/components/EncomendaCard';
import { EncomendaForm } from './src/components/EncomendaForm';
import { EventosPanel } from './src/components/EventosPanel';
import { rotaFacilApi } from './src/services/api';
import { COLORS, MODALIDADE_LABEL, STATUS_META } from './src/styles/theme';
import {
  CriarEncomendaPayload,
  Encomenda,
  ModalidadeEntrega,
  NotificacaoSimulada,
  RegistroAuditoria,
  StatusEncomenda,
} from './src/types/encomenda';

type AbaPrincipal = 'DESPACHOS' | 'CADASTRO' | 'EVENTOS';

const STATUS_OPCOES: ('TODOS' | StatusEncomenda)[] = [
  'TODOS',
  'PENDENTE',
  'EM_ROTA',
  'ENTREGUE',
  'CANCELADA',
];

const MODALIDADE_OPCOES: ('TODAS' | ModalidadeEntrega)[] = [
  'TODAS',
  'PADRAO',
  'EXPRESSA',
  'BALCAO',
];

export default function App() {
  const [aba, setAba] = useState<AbaPrincipal>('DESPACHOS');
  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [todasEncomendas, setTodasEncomendas] = useState<Encomenda[]>([]);
  const [auditoria, setAuditoria] = useState<RegistroAuditoria[]>([]);
  const [notificacoes, setNotificacoes] = useState<NotificacaoSimulada[]>([]);

  const [filtroStatus, setFiltroStatus] = useState<'TODOS' | StatusEncomenda>('TODOS');
  const [filtroModalidade, setFiltroModalidade] = useState<'TODAS' | ModalidadeEntrega>('TODAS');
  const [busca, setBusca] = useState('');

  const [carregando, setCarregando] = useState(true);
  const [atualizandoId, setAtualizandoId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(
    null
  );

  const carregarDados = useCallback(async () => {
    try {
      setCarregando(true);
      const [filtradas, todas, logs, notifs] = await Promise.all([
        rotaFacilApi.listarEncomendas({
          status: filtroStatus,
          modalidade: filtroModalidade,
          busca,
        }),
        rotaFacilApi.listarEncomendas(),
        rotaFacilApi.listarAuditoria(),
        rotaFacilApi.listarNotificacoes(),
      ]);

      setEncomendas(filtradas);
      setTodasEncomendas(todas);
      setAuditoria(logs);
      setNotificacoes(notifs);
    } catch (error) {
      setFeedback({
        tipo: 'erro',
        texto:
          error instanceof Error
            ? `Não foi possível conectar à API: ${error.message}`
            : 'Erro ao carregar dados da API.',
      });
    } finally {
      setCarregando(false);
    }
  }, [filtroStatus, filtroModalidade, busca]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  async function handleCadastrar(payload: CriarEncomendaPayload) {
    const criada = await rotaFacilApi.cadastrarEncomenda(payload);
    setFeedback({
      tipo: 'sucesso',
      texto: `Encomenda ${criada.codigo} cadastrada! Auditoria e notificação ao cliente disparadas via Observer.`,
    });
    setAba('DESPACHOS');
    await carregarDados();
  }

  async function handleMudarStatus(id: string, novoStatus: StatusEncomenda) {
    try {
      setAtualizandoId(id);
      const atualizada = await rotaFacilApi.atualizarStatus(id, novoStatus);
      setFeedback({
        tipo: 'sucesso',
        texto: `Encomenda ${atualizada.codigo} atualizada para ${STATUS_META[atualizada.status].label}. Observers notificados!`,
      });
      await carregarDados();
    } catch (error) {
      setFeedback({
        tipo: 'erro',
        texto: error instanceof Error ? error.message : 'Erro ao alterar status.',
      });
    } finally {
      setAtualizandoId(null);
    }
  }

  const totalPendentes = todasEncomendas.filter((e) => e.status === 'PENDENTE').length;
  const totalEmRota = todasEncomendas.filter((e) => e.status === 'EM_ROTA').length;
  const totalEntregues = todasEncomendas.filter((e) => e.status === 'ENTREGUE').length;
  const totalCanceladas = todasEncomendas.filter((e) => e.status === 'CANCELADA').length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <View style={styles.topBarInner}>
          <View>
            <Text style={styles.brandTitle}>RotaFácil — Painel de Despachos</Text>
            <Text style={styles.brandSubtitle}>
              Gestão de entregas urbanas • Decorator (Frete) • State (Status) • Observer (Eventos)
            </Text>
          </View>

          <Pressable style={styles.refreshBtn} onPress={carregarDados}>
            <Text style={styles.refreshBtnText}>Atualizar</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total do Dia</Text>
            <Text style={styles.statValue}>{todasEncomendas.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statLabel, { color: COLORS.warning }]}>Pendentes</Text>
            <Text style={[styles.statValue, { color: COLORS.warning }]}>{totalPendentes}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statLabel, { color: COLORS.info }]}>Em Rota</Text>
            <Text style={[styles.statValue, { color: COLORS.info }]}>{totalEmRota}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statLabel, { color: COLORS.success }]}>Entregues</Text>
            <Text style={[styles.statValue, { color: COLORS.success }]}>{totalEntregues}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statLabel, { color: COLORS.danger }]}>Canceladas</Text>
            <Text style={[styles.statValue, { color: COLORS.danger }]}>{totalCanceladas}</Text>
          </View>
        </View>

        <View style={styles.navTabs}>
          <Pressable
            style={[styles.navBtn, aba === 'DESPACHOS' && styles.navBtnActive]}
            onPress={() => setAba('DESPACHOS')}
          >
            <Text style={[styles.navBtnText, aba === 'DESPACHOS' && styles.navBtnTextActive]}>
              Despachos do Dia ({todasEncomendas.length})
            </Text>
          </Pressable>

          <Pressable
            style={[styles.navBtn, aba === 'CADASTRO' && styles.navBtnActive]}
            onPress={() => setAba('CADASTRO')}
          >
            <Text style={[styles.navBtnText, aba === 'CADASTRO' && styles.navBtnTextActive]}>
              + Nova Encomenda
            </Text>
          </Pressable>

          <Pressable
            style={[styles.navBtn, aba === 'EVENTOS' && styles.navBtnActive]}
            onPress={() => setAba('EVENTOS')}
          >
            <Text style={[styles.navBtnText, aba === 'EVENTOS' && styles.navBtnTextActive]}>
              Central de Eventos ({auditoria.length})
            </Text>
          </Pressable>
        </View>

        {feedback ? (
          <View
            style={[
              styles.feedbackBanner,
              feedback.tipo === 'sucesso' ? styles.feedbackSuccess : styles.feedbackError,
            ]}
          >
            <Text
              style={[
                styles.feedbackText,
                { color: feedback.tipo === 'sucesso' ? COLORS.success : COLORS.danger },
              ]}
            >
              {feedback.texto}
            </Text>
            <Pressable onPress={() => setFeedback(null)}>
              <Text style={styles.feedbackClose}>✕</Text>
            </Pressable>
          </View>
        ) : null}

        {aba === 'DESPACHOS' ? (
          <View>
            <View style={styles.filterBox}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por código (ex: RF-2026-001), cliente ou bairro de destino..."
                placeholderTextColor={COLORS.textSubtle}
                value={busca}
                onChangeText={setBusca}
              />

              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Status:</Text>
                <View style={styles.chipsRow}>
                  {STATUS_OPCOES.map((st) => {
                    const ativo = filtroStatus === st;
                    return (
                      <Pressable
                        key={st}
                        style={[styles.chip, ativo && styles.chipActive]}
                        onPress={() => setFiltroStatus(st)}
                      >
                        <Text style={[styles.chipText, ativo && styles.chipTextActive]}>
                          {st === 'TODOS' ? 'Todos' : STATUS_META[st].label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Modalidade:</Text>
                <View style={styles.chipsRow}>
                  {MODALIDADE_OPCOES.map((mod) => {
                    const ativo = filtroModalidade === mod;
                    return (
                      <Pressable
                        key={mod}
                        style={[styles.chip, ativo && styles.chipActive]}
                        onPress={() => setFiltroModalidade(mod)}
                      >
                        <Text style={[styles.chipText, ativo && styles.chipTextActive]}>
                          {mod === 'TODAS' ? 'Todas' : MODALIDADE_LABEL[mod]}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>

            {carregando ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Carregando encomendas...</Text>
              </View>
            ) : encomendas.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>Nenhuma encomenda encontrada</Text>
                <Text style={styles.emptySubtitle}>
                  Ajuste os filtros ou cadastre uma nova encomenda para o dia.
                </Text>
              </View>
            ) : (
              encomendas.map((item) => (
                <EncomendaCard
                  key={item.id}
                  encomenda={item}
                  atualizando={atualizandoId === item.id}
                  onMudarStatus={handleMudarStatus}
                />
              ))
            )}
          </View>
        ) : null}

        {aba === 'CADASTRO' ? <EncomendaForm onCadastrar={handleCadastrar} /> : null}

        {aba === 'EVENTOS' ? (
          <EventosPanel auditoria={auditoria} notificacoes={notificacoes} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  topBar: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  topBarInner: {
    maxWidth: 1120,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#BFDBFE',
    marginTop: 2,
  },
  refreshBtn: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  refreshBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    maxWidth: 1120,
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 48,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    minWidth: 130,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 4,
  },
  navTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  navBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  navBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  navBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  navBtnTextActive: {
    color: '#FFFFFF',
  },
  feedbackBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  feedbackSuccess: {
    backgroundColor: COLORS.successBg,
  },
  feedbackError: {
    backgroundColor: COLORS.dangerBg,
  },
  feedbackText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  feedbackClose: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textMuted,
    paddingLeft: 12,
  },
  filterBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  loadingBox: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  loadingText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  emptyBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
  },
});
