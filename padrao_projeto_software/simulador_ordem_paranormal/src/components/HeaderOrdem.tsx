import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { gameStyles } from '../styles/theme';

export type AbaAtiva =
  | 'ARENA'
  | 'COMBATENTES'
  | 'ACOES'
  | 'AMULETOS'
  | 'DADOS_REGRAS';

interface HeaderOrdemProps {
  abaAtiva: AbaAtiva;
  onSelectAba: (aba: AbaAtiva) => void;
}

const ABAS: { id: AbaAtiva; label: string }[] = [
  { id: 'ARENA', label: '⚔️ Arena de Combate' },
  { id: 'COMBATENTES', label: '🕵️ Pessoas & Monstros (Factory)' },
  { id: 'ACOES', label: '🔮 Ações & Dados (Strategy)' },
  { id: 'AMULETOS', label: '📿 Amuletos (Decorator)' },
  { id: 'DADOS_REGRAS', label: '🎲 Rolador & Regras (Singleton)' },
];

export function HeaderOrdem({ abaAtiva, onSelectAba }: HeaderOrdemProps) {
  return (
    <>
      <View style={gameStyles.headerContainer}>
        <View style={gameStyles.headerBadgeRow}>
          <View style={gameStyles.headerBadge}>
            <Text style={gameStyles.headerBadgeText}>
              5 PADRÕES GOF • ORDEM PARANORMAL RPG
            </Text>
          </View>
          <View style={gameStyles.headerBadgeOffline}>
            <Text style={gameStyles.headerBadgeOfflineText}>
              🟢 100% OFFLINE & CONFIGURÁVEL
            </Text>
          </View>
        </View>
        <Text style={gameStyles.title}>⚔️ SIMULADOR ORDEM PARANORMAL</Text>
        <Text style={gameStyles.subtitle}>
          Múltiplos Agentes & Criaturas • Dados Livres (d4–d100) • Ciclo Elemental • Raio-X de Dano
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={gameStyles.tabsScroll}
      >
        <View style={gameStyles.tabsRow}>
          {ABAS.map((aba) => {
            const ativa = abaAtiva === aba.id;
            return (
              <TouchableOpacity
                key={aba.id}
                style={[gameStyles.tabBtn, ativa && gameStyles.tabBtnActive]}
                onPress={() => onSelectAba(aba.id)}
              >
                <Text
                  style={[
                    gameStyles.tabBtnText,
                    ativa && gameStyles.tabBtnTextActive,
                  ]}
                >
                  {aba.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
