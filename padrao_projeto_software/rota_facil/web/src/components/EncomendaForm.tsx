import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { rotaFacilApi } from '../services/api';
import { COLORS, MODALIDADE_LABEL, formatarMoeda } from '../styles/theme';
import {
  AdicionalFrete,
  CriarEncomendaPayload,
  ModalidadeEntrega,
  ResultadoFrete,
} from '../types/encomenda';

interface Props {
  onCadastrar: (payload: CriarEncomendaPayload) => Promise<void>;
}

const MODALIDADES: ModalidadeEntrega[] = ['PADRAO', 'EXPRESSA', 'BALCAO'];

const ADICIONAIS_OPCOES: {
  id: AdicionalFrete;
  titulo: string;
  descricao: string;
}[] = [
  {
    id: 'SEGURO',
    titulo: 'Seguro de Carga',
    descricao: '+3% do valor declarado (mín. R$ 6,00)',
  },
  {
    id: 'FRAGIL',
    titulo: 'Embalagem Frágil',
    descricao: '+R$ 12,00 e +1h de preparo cuidadoso',
  },
  {
    id: 'URGENCIA',
    titulo: 'Prioridade / Urgência',
    descricao: '+R$ 18,00 e reduz prazo pela metade',
  },
];

export function EncomendaForm({ onCadastrar }: Props) {
  const [codigo, setCodigo] = useState('');
  const [cliente, setCliente] = useState('');
  const [contatoCliente, setContatoCliente] = useState('');
  const [origem, setOrigem] = useState('Centro - Depósito RotaFácil');
  const [destino, setDestino] = useState('');
  const [pesoKg, setPesoKg] = useState('2.5');
  const [valorDeclarado, setValorDeclarado] = useState('150');
  const [modalidade, setModalidade] = useState<ModalidadeEntrega>('PADRAO');
  const [adicionais, setAdicionais] = useState<AdicionalFrete[]>([]);

  const [previa, setPrevia] = useState<ResultadoFrete | null>(null);
  const [carregandoPrevia, setCarregandoPrevia] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroForm, setErroForm] = useState<string | null>(null);

  const pesoNumero = Number(pesoKg.replace(',', '.'));
  const valorNumero = Number(valorDeclarado.replace(',', '.'));

  useEffect(() => {
    if (!Number.isFinite(pesoNumero) || pesoNumero <= 0 || !Number.isFinite(valorNumero) || valorNumero < 0) {
      setPrevia(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setCarregandoPrevia(true);
        const resultado = await rotaFacilApi.simularFrete({
          modalidade,
          pesoKg: pesoNumero,
          valorDeclarado: valorNumero,
          adicionais,
        });
        setPrevia(resultado);
      } catch {
        setPrevia(null);
      } finally {
        setCarregandoPrevia(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [modalidade, pesoNumero, valorNumero, adicionais]);

  function alternarAdicional(id: AdicionalFrete) {
    setAdicionais((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]
    );
  }

  async function handleSubmit() {
    setErroForm(null);

    if (!cliente.trim() || !origem.trim() || !destino.trim()) {
      setErroForm('Preencha cliente, origem e destino para cadastrar a encomenda.');
      return;
    }

    if (!Number.isFinite(pesoNumero) || pesoNumero <= 0) {
      setErroForm('Informe um peso válido maior que zero.');
      return;
    }

    if (!Number.isFinite(valorNumero) || valorNumero < 0) {
      setErroForm('Informe um valor declarado válido.');
      return;
    }

    try {
      setEnviando(true);
      await onCadastrar({
        codigo: codigo.trim() || undefined,
        cliente: cliente.trim(),
        contatoCliente: contatoCliente.trim() || '(não informado)',
        origem: origem.trim(),
        destino: destino.trim(),
        pesoKg: pesoNumero,
        valorDeclarado: valorNumero,
        modalidade,
        adicionais,
      });

      setCodigo('');
      setCliente('');
      setContatoCliente('');
      setDestino('');
      setPesoKg('2.5');
      setValorDeclarado('150');
      setModalidade('PADRAO');
      setAdicionais([]);
    } catch (error) {
      setErroForm(error instanceof Error ? error.message : 'Erro ao cadastrar.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formColumn}>
        <Text style={styles.sectionTitle}>Nova Encomenda</Text>
        <Text style={styles.sectionSubtitle}>
          Cadastre os dados do despacho e combine adicionais (padrão Decorator) para simular o frete em tempo real.
        </Text>

        {erroForm ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{erroForm}</Text>
          </View>
        ) : null}

        <View style={styles.row}>
          <View style={styles.fieldHalf}>
            <Text style={styles.label}>Código (opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Automático (ex: RF-2026-005)"
              placeholderTextColor={COLORS.textSubtle}
              value={codigo}
              onChangeText={setCodigo}
            />
          </View>
          <View style={styles.fieldHalf}>
            <Text style={styles.label}>Cliente *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome completo do cliente"
              placeholderTextColor={COLORS.textSubtle}
              value={cliente}
              onChangeText={setCliente}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.fieldHalf}>
            <Text style={styles.label}>Contato (WhatsApp / SMS)</Text>
            <TextInput
              style={styles.input}
              placeholder="(51) 99999-0000"
              placeholderTextColor={COLORS.textSubtle}
              value={contatoCliente}
              onChangeText={setContatoCliente}
            />
          </View>
          <View style={styles.fieldQuarter}>
            <Text style={styles.label}>Peso (kg) *</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={pesoKg}
              onChangeText={setPesoKg}
            />
          </View>
          <View style={styles.fieldQuarter}>
            <Text style={styles.label}>Valor Declarado (R$)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={valorDeclarado}
              onChangeText={setValorDeclarado}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.fieldHalf}>
            <Text style={styles.label}>Origem *</Text>
            <TextInput
              style={styles.input}
              placeholder="Bairro / endereço de coleta"
              placeholderTextColor={COLORS.textSubtle}
              value={origem}
              onChangeText={setOrigem}
            />
          </View>
          <View style={styles.fieldHalf}>
            <Text style={styles.label}>Destino *</Text>
            <TextInput
              style={styles.input}
              placeholder="Bairro / endereço de entrega"
              placeholderTextColor={COLORS.textSubtle}
              value={destino}
              onChangeText={setDestino}
            />
          </View>
        </View>

        <Text style={styles.label}>Modalidade de Entrega *</Text>
        <View style={styles.optionRow}>
          {MODALIDADES.map((mod) => {
            const ativo = modalidade === mod;
            return (
              <Pressable
                key={mod}
                style={[styles.choiceBtn, ativo && styles.choiceBtnActive]}
                onPress={() => setModalidade(mod)}
              >
                <Text style={[styles.choiceText, ativo && styles.choiceTextActive]}>
                  {MODALIDADE_LABEL[mod]}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Adicionais de Frete (Decorators combináveis)</Text>
        <View style={styles.adicionaisList}>
          {ADICIONAIS_OPCOES.map((item) => {
            const marcado = adicionais.includes(item.id);
            return (
              <Pressable
                key={item.id}
                style={[styles.adicionalCard, marcado && styles.adicionalCardActive]}
                onPress={() => alternarAdicional(item.id)}
              >
                <View style={styles.adicionalHeader}>
                  <Text style={[styles.adicionalTitle, marcado && styles.adicionalTitleActive]}>
                    {marcado ? '☑' : '☐'} {item.titulo}
                  </Text>
                </View>
                <Text style={styles.adicionalDesc}>{item.descricao}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={[styles.submitBtn, enviando && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={enviando}
        >
          <Text style={styles.submitBtnText}>
            {enviando ? 'Cadastrando...' : 'Cadastrar Encomenda'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.previewColumn}>
        <Text style={styles.previewTitle}>Prévia em Tempo Real</Text>
        <Text style={styles.previewSubtitle}>
          Calculada pela API usando composição de Decorators
        </Text>

        {carregandoPrevia ? (
          <View style={styles.previewLoading}>
            <ActivityIndicator color={COLORS.primary} />
            <Text style={styles.previewLoadingText}>Recalculando frete...</Text>
          </View>
        ) : previa ? (
          <View style={styles.previewBody}>
            <View style={styles.previewHighlightRow}>
              <View style={styles.previewStat}>
                <Text style={styles.previewStatLabel}>Taxa Total</Text>
                <Text style={styles.previewStatValue}>
                  {formatarMoeda(previa.taxaTotal)}
                </Text>
              </View>
              <View style={styles.previewStat}>
                <Text style={styles.previewStatLabel}>Prazo Estimado</Text>
                <Text style={styles.previewStatValue}>{previa.prazoHoras}h</Text>
              </View>
            </View>

            <Text style={styles.breakdownHeading}>Composição da Taxa</Text>
            {previa.itens.map((item, index) => (
              <View key={`${item.nome}-${index}`} style={styles.breakdownRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.breakdownName}>{item.nome}</Text>
                  <Text style={styles.breakdownDetail}>{item.detalhe}</Text>
                </View>
                <Text style={styles.breakdownValue}>{formatarMoeda(item.valor)}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.previewEmpty}>
            Informe um peso válido para visualizar a simulação de taxa e prazo.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  formColumn: {
    flex: 2,
    minWidth: 320,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  previewColumn: {
    flex: 1,
    minWidth: 280,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: COLORS.dangerBg,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  fieldHalf: {
    flex: 1,
    minWidth: 200,
  },
  fieldQuarter: {
    flex: 1,
    minWidth: 120,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  choiceBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceAlt,
  },
  choiceBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  choiceText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  choiceTextActive: {
    color: '#FFFFFF',
  },
  adicionaisList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  adicionalCard: {
    flex: 1,
    minWidth: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceAlt,
    padding: 12,
  },
  adicionalCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  adicionalHeader: {
    marginBottom: 4,
  },
  adicionalTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  adicionalTitleActive: {
    color: COLORS.primary,
  },
  adicionalDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  previewSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    marginBottom: 16,
  },
  previewLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
  },
  previewLoadingText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  previewBody: {
    gap: 12,
  },
  previewHighlightRow: {
    flexDirection: 'row',
    gap: 12,
  },
  previewStat: {
    flex: 1,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  previewStatLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  previewStatValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 4,
  },
  breakdownHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 4,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  breakdownName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  breakdownDetail: {
    fontSize: 11,
    color: COLORS.textSubtle,
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  previewEmpty: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
});
