import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  COLORS,
  MODALIDADE_LABEL,
  STATUS_META,
  formatarDataHora,
  formatarMoeda,
} from '../styles/theme';
import { Encomenda, StatusEncomenda } from '../types/encomenda';

interface Props {
  encomenda: Encomenda;
  atualizando: boolean;
  onMudarStatus: (id: string, novoStatus: StatusEncomenda) => Promise<void>;
}

const ACAO_LABEL: Record<StatusEncomenda, { texto: string; cor: string }> = {
  PENDENTE: { texto: 'Pendente', cor: COLORS.warning },
  EM_ROTA: { texto: 'Iniciar Rota', cor: COLORS.info },
  ENTREGUE: { texto: 'Confirmar Entrega', cor: COLORS.success },
  CANCELADA: { texto: 'Cancelar', cor: COLORS.danger },
};

export function EncomendaCard({ encomenda, atualizando, onMudarStatus }: Props) {
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const statusInfo = STATUS_META[encomenda.status];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.codigo}>{encomenda.codigo}</Text>
          <View style={[styles.badge, { backgroundColor: statusInfo.bg }]}>
            <Text style={[styles.badgeText, { color: statusInfo.color }]}>
              {statusInfo.label}
            </Text>
          </View>
          <View style={styles.modalidadeBadge}>
            <Text style={styles.modalidadeText}>
              {MODALIDADE_LABEL[encomenda.modalidade]}
            </Text>
          </View>
        </View>

        <View style={styles.priceGroup}>
          <Text style={styles.price}>{formatarMoeda(encomenda.taxaEntrega)}</Text>
          <Text style={styles.prazo}>Prazo: {encomenda.prazoHoras}h</Text>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <Text style={styles.cliente}>
          Cliente: <Text style={styles.bold}>{encomenda.cliente}</Text> ({encomenda.contatoCliente})
        </Text>
        <Text style={styles.rota}>
          {encomenda.origem} → <Text style={styles.bold}>{encomenda.destino}</Text>
        </Text>
        <Text style={styles.meta}>
          Peso: {encomenda.pesoKg} kg • Valor declarado: {formatarMoeda(encomenda.valorDeclarado)} • Atualizada em {formatarDataHora(encomenda.atualizadaEm)}
        </Text>
      </View>

      {encomenda.adicionais.length > 0 ? (
        <View style={styles.tagsRow}>
          {encomenda.adicionais.map((adicional) => (
            <View key={adicional} style={styles.tag}>
              <Text style={styles.tagText}>+ {adicional}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.footer}>
        <Pressable
          style={styles.detailsToggle}
          onPress={() => setMostrarDetalhes((v) => !v)}
        >
          <Text style={styles.detailsToggleText}>
            {mostrarDetalhes ? 'Ocultar composição do frete' : 'Ver composição do frete'}
          </Text>
        </Pressable>

        <View style={styles.actionsRow}>
          {encomenda.transicoesPermitidas.length === 0 ? (
            <Text style={styles.finalStateText}>Estado final (sem transições)</Text>
          ) : (
            encomenda.transicoesPermitidas.map((proxStatus) => {
              const acao = ACAO_LABEL[proxStatus];
              return (
                <Pressable
                  key={proxStatus}
                  style={[
                    styles.actionBtn,
                    { backgroundColor: acao.cor },
                    atualizando && styles.actionBtnDisabled,
                  ]}
                  disabled={atualizando}
                  onPress={() => onMudarStatus(encomenda.id, proxStatus)}
                >
                  <Text style={styles.actionBtnText}>{acao.texto}</Text>
                </Pressable>
              );
            })
          )}
        </View>
      </View>

      {mostrarDetalhes ? (
        <View style={styles.breakdownBox}>
          <Text style={styles.breakdownTitle}>Detalhamento do Frete (Decorator)</Text>
          {encomenda.composicaoFrete.map((item, idx) => (
            <View key={`${item.nome}-${idx}`} style={styles.breakdownItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.breakdownName}>{item.nome}</Text>
                <Text style={styles.breakdownDetail}>{item.detalhe}</Text>
              </View>
              <Text style={styles.breakdownValue}>{formatarMoeda(item.valor)}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  codigo: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  modalidadeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalidadeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  priceGroup: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  prazo: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  infoGrid: {
    gap: 4,
    marginBottom: 10,
  },
  cliente: {
    fontSize: 14,
    color: COLORS.text,
  },
  rota: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  meta: {
    fontSize: 12,
    color: COLORS.textSubtle,
  },
  bold: {
    fontWeight: '700',
    color: COLORS.text,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  detailsToggle: {
    paddingVertical: 4,
  },
  detailsToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionBtnDisabled: {
    opacity: 0.6,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  finalStateText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: COLORS.textSubtle,
  },
  breakdownBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  breakdownTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  breakdownName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  breakdownDetail: {
    fontSize: 11,
    color: COLORS.textSubtle,
  },
  breakdownValue: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
});
