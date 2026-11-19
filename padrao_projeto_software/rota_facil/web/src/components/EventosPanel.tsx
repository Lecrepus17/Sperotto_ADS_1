import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, STATUS_META, formatarDataHora } from '../styles/theme';
import { NotificacaoSimulada, RegistroAuditoria } from '../types/encomenda';

interface Props {
  auditoria: RegistroAuditoria[];
  notificacoes: NotificacaoSimulada[];
}

export function EventosPanel({ auditoria, notificacoes }: Props) {
  const [subAba, setSubAba] = useState<'AUDITORIA' | 'NOTIFICACOES'>('AUDITORIA');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Central de Eventos (Padrão Observer)</Text>
      <Text style={styles.subtitle}>
        Toda criação de encomenda ou mudança de status notifica automaticamente os observadores de Auditoria e Notificação ao Cliente.
      </Text>

      <View style={styles.tabsRow}>
        <Pressable
          style={[styles.tabBtn, subAba === 'AUDITORIA' && styles.tabBtnActive]}
          onPress={() => setSubAba('AUDITORIA')}
        >
          <Text style={[styles.tabText, subAba === 'AUDITORIA' && styles.tabTextActive]}>
            Log de Auditoria ({auditoria.length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabBtn, subAba === 'NOTIFICACOES' && styles.tabBtnActive]}
          onPress={() => setSubAba('NOTIFICACOES')}
        >
          <Text style={[styles.tabText, subAba === 'NOTIFICACOES' && styles.tabTextActive]}>
            Notificações ao Cliente ({notificacoes.length})
          </Text>
        </Pressable>
      </View>

      {subAba === 'AUDITORIA' ? (
        <View style={styles.list}>
          {auditoria.length === 0 ? (
            <Text style={styles.empty}>Nenhum evento de auditoria registrado ainda.</Text>
          ) : (
            auditoria.map((item) => {
              const statusInfo = STATUS_META[item.statusNovo];
              return (
                <View key={item.id} style={styles.eventCard}>
                  <View style={styles.eventHeader}>
                    <View style={styles.eventLeft}>
                      <Text style={styles.code}>{item.codigoEncomenda}</Text>
                      <View style={[styles.badge, { backgroundColor: statusInfo.bg }]}>
                        <Text style={[styles.badgeText, { color: statusInfo.color }]}>
                          {item.tipoEvento === 'ENCOMENDA_CRIADA' ? 'CRIAÇÃO' : 'STATUS'} → {statusInfo.label}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.time}>{formatarDataHora(item.ocorridoEm)}</Text>
                  </View>
                  <Text style={styles.bodyText}>{item.resumo}</Text>
                </View>
              );
            })
          )}
        </View>
      ) : (
        <View style={styles.list}>
          {notificacoes.length === 0 ? (
            <Text style={styles.empty}>Nenhuma notificação disparada ainda.</Text>
          ) : (
            notificacoes.map((item) => (
              <View key={item.id} style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <View style={styles.eventLeft}>
                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor:
                            item.canal === 'WhatsApp' ? COLORS.successBg : COLORS.infoBg,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          {
                            color:
                              item.canal === 'WhatsApp' ? COLORS.success : COLORS.info,
                          },
                        ]}
                      >
                        {item.canal}
                      </Text>
                    </View>
                    <Text style={styles.code}>{item.destinatario}</Text>
                    <Text style={styles.contact}>{item.contato}</Text>
                  </View>
                  <Text style={styles.time}>{formatarDataHora(item.enviadaEm)}</Text>
                </View>
                <Text style={styles.bodyText}>{item.mensagem}</Text>
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  tabBtn: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  list: {
    gap: 10,
  },
  empty: {
    fontSize: 13,
    color: COLORS.textMuted,
    paddingVertical: 12,
  },
  eventCard: {
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 6,
  },
  eventLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  code: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  contact: {
    fontSize: 12,
    color: COLORS.textSubtle,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  time: {
    fontSize: 12,
    color: COLORS.textSubtle,
  },
  bodyText: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 19,
  },
});
