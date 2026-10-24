import { StyleSheet } from 'react-native';

export const COLORS = {
  bgDeep: '#090410',
  bgArena: '#120820',
  bgCard: '#1A0D2E',
  bgCardAlt: '#24123E',
  bgInput: '#0E061A',
  bgTerminal: '#06020B',

  purplePrimary: '#7B2CBF',
  purpleBright: '#9D4EDD',
  purpleNeon: '#C77DFF',
  purpleGlow: '#E0AAFF',
  purpleBorder: '#3F1D6B',

  sangue: '#FF4D6D',
  sangueBg: '#3B0A18',
  morte: '#CBD5E1',
  morteBg: '#1E293B',
  conhecimento: '#FDE047',
  conhecimentoBg: '#3B2F06',
  energia: '#E879F9',
  energiaBg: '#340D49',
  medo: '#67E8F9',
  medoBg: '#083344',

  crimson: '#E63946',
  crimsonDark: '#590D16',
  emerald: '#10B981',
  emeraldDark: '#064E3B',
  cyanSan: '#38BDF8',
  gold: '#F59E0B',
  goldLight: '#FDE68A',

  textPrimary: '#F5F0FF',
  textSecondary: '#C4B5FD',
  textMuted: '#8B7AA8',
};

export const gameStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bgDeep,
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 42,
    maxWidth: 760,
    width: '100%',
    alignSelf: 'center',
  },
  headerContainer: {
    backgroundColor: COLORS.bgArena,
    borderWidth: 1.5,
    borderColor: COLORS.purplePrimary,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  headerBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
    marginBottom: 6,
  },
  headerBadge: {
    backgroundColor: COLORS.bgCardAlt,
    borderColor: COLORS.purpleBright,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  headerBadgeOffline: {
    backgroundColor: COLORS.emeraldDark,
    borderColor: COLORS.emerald,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  headerBadgeText: {
    color: COLORS.purpleGlow,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  headerBadgeOfflineText: {
    color: '#A7F3D0',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },

  // Abas de navegação
  tabsScroll: {
    marginBottom: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  tabBtn: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1.5,
    borderColor: COLORS.purpleBorder,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: COLORS.purplePrimary,
    borderColor: COLORS.purpleGlow,
  },
  tabBtnText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '800',
  },
  tabBtnTextActive: {
    color: COLORS.textPrimary,
  },

  // Cartões e Seções
  sectionCard: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1.5,
    borderColor: COLORS.purpleBorder,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 6,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  sectionSubtitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginBottom: 10,
  },
  patternPill: {
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.purpleBright,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  patternPillText: {
    color: COLORS.purpleGlow,
    fontSize: 10,
    fontWeight: '800',
  },

  // Cartões de Combatente (Agentes e Criaturas)
  teamGrid: {
    gap: 10,
  },
  fighterCard: {
    backgroundColor: COLORS.bgArena,
    borderWidth: 1.5,
    borderColor: COLORS.purpleBorder,
    borderRadius: 14,
    padding: 12,
  },
  fighterCardSelectedAttacker: {
    borderColor: COLORS.emerald,
    backgroundColor: '#0E2224',
  },
  fighterCardSelectedTarget: {
    borderColor: COLORS.crimson,
    backgroundColor: '#250D1C',
  },
  fighterCardDead: {
    opacity: 0.55,
    borderColor: '#334155',
  },
  fighterCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  fighterIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1.5,
    borderColor: COLORS.purpleBright,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 22,
  },
  fighterName: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '900',
  },
  fighterSub: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 1,
  },
  badgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 4,
  },
  miniBadge: {
    backgroundColor: COLORS.bgDeep,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  miniBadgeText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: '700',
  },
  amuletBadge: {
    backgroundColor: '#3B2506',
    borderWidth: 1,
    borderColor: COLORS.gold,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  amuletBadgeText: {
    color: COLORS.goldLight,
    fontSize: 10,
    fontWeight: '800',
  },

  // Barras de Status (PV, PE, SAN)
  barsContainer: {
    gap: 6,
    marginTop: 6,
  },
  barRow: {
    gap: 3,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: '800',
  },
  barValue: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '800',
  },
  barTrack: {
    height: 8,
    backgroundColor: COLORS.bgDeep,
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2D1948',
  },
  barFillPV: {
    height: '100%',
    backgroundColor: COLORS.crimson,
    borderRadius: 999,
  },
  barFillPE: {
    height: '100%',
    backgroundColor: COLORS.gold,
    borderRadius: 999,
  },
  barFillSAN: {
    height: '100%',
    backgroundColor: COLORS.cyanSan,
    borderRadius: 999,
  },

  // Botões de Seleção de Atacante / Alvo no card
  cardActionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  smallActionBtn: {
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  smallActionBtnActiveAttacker: {
    backgroundColor: COLORS.emeraldDark,
    borderColor: COLORS.emerald,
  },
  smallActionBtnActiveTarget: {
    backgroundColor: COLORS.crimsonDark,
    borderColor: COLORS.crimson,
  },
  smallActionBtnText: {
    color: COLORS.textPrimary,
    fontSize: 10,
    fontWeight: '800',
  },

  // Raio-X do Dano (Painel de Decomposição Matemática)
  damageXRayCard: {
    backgroundColor: '#120722',
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  diceChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 6,
  },
  dieChipBase: {
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1.5,
    borderColor: COLORS.purpleNeon,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dieChipCrit: {
    backgroundColor: '#450A0A',
    borderWidth: 1.5,
    borderColor: '#F87171',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dieChipDecorator: {
    backgroundColor: '#3B2506',
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dieChipText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '900',
  },
  mathStepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#23113A',
  },
  mathStepLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  mathStepValue: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '800',
  },
  mathTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.gold,
  },
  mathTotalLabel: {
    color: COLORS.goldLight,
    fontSize: 14,
    fontWeight: '900',
  },
  mathTotalValue: {
    color: COLORS.goldLight,
    fontSize: 18,
    fontWeight: '900',
  },

  // Botões Principais e Grid de Ações
  actionsGrid: {
    gap: 8,
  },
  actionOptionCard: {
    backgroundColor: COLORS.bgArena,
    borderWidth: 1.5,
    borderColor: COLORS.purpleBorder,
    borderRadius: 12,
    padding: 10,
  },
  actionOptionCardActive: {
    backgroundColor: COLORS.bgCardAlt,
    borderColor: COLORS.purpleNeon,
  },
  primaryAttackBtn: {
    backgroundColor: COLORS.purplePrimary,
    borderWidth: 1.5,
    borderColor: COLORS.purpleGlow,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryAttackBtnDisabled: {
    opacity: 0.45,
  },
  primaryAttackBtnText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
  primaryAttackSubtext: {
    color: COLORS.purpleGlow,
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },

  // Formulários e Inputs das Oficinas
  formGroup: {
    marginBottom: 10,
  },
  inputLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: COLORS.bgInput,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: COLORS.textPrimary,
    fontSize: 13,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  colInput: {
    flex: 1,
    minWidth: 90,
  },
  chipsSelectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chipOption: {
    backgroundColor: COLORS.bgArena,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipOptionActive: {
    backgroundColor: COLORS.purplePrimary,
    borderColor: COLORS.purpleGlow,
  },
  chipOptionText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '800',
  },
  chipOptionTextActive: {
    color: COLORS.textPrimary,
  },

  // Botões Secundários
  secondaryRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  goldBtn: {
    flex: 1,
    minWidth: 130,
    backgroundColor: '#2B1B0E',
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldBtnText: {
    color: COLORS.goldLight,
    fontWeight: '800',
    fontSize: 12,
    textAlign: 'center',
  },
  secondaryBtn: {
    flex: 1,
    minWidth: 120,
    backgroundColor: COLORS.bgArena,
    borderWidth: 1.5,
    borderColor: COLORS.purpleBorder,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: COLORS.textSecondary,
    fontWeight: '800',
    fontSize: 12,
    textAlign: 'center',
  },

  // Log de Batalha
  logBox: {
    backgroundColor: COLORS.bgTerminal,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder,
    borderRadius: 12,
    padding: 12,
    minHeight: 140,
    maxHeight: 280,
  },
  logEmpty: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  logEntry: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#1A0D2E',
  },
  logText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontFamily: 'monospace',
  },
  logTextMasterAlert: {
    color: '#FF6B8B',
    fontWeight: '800',
  },
  logTextCritical: {
    color: COLORS.goldLight,
    fontWeight: '800',
  },
  logTextOpressao: {
    color: '#A7F3D0',
    fontWeight: '800',
  },
});
