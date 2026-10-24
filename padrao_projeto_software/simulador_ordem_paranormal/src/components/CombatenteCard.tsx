import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Entidade } from '../patterns/factory/Entidade';
import { gameStyles } from '../styles/theme';
import { ELEMENTOS_ORDEM } from '../types/Elementos';

export interface CombatenteInstanciaArena {
  uid: string;
  entidade: Entidade;
}

interface CombatenteCardProps {
  item: CombatenteInstanciaArena;
  ehAtacante: boolean;
  ehAlvo: boolean;
  podeRemover: boolean;
  onSelecionarAtacante: (item: CombatenteInstanciaArena) => void;
  onSelecionarAlvo: (item: CombatenteInstanciaArena) => void;
  onRemover: (uid: string) => void;
}

export function CombatenteCard({
  item,
  ehAtacante,
  ehAlvo,
  podeRemover,
  onSelecionarAtacante,
  onSelecionarAlvo,
  onRemover,
}: CombatenteCardProps) {
  const ent = item.entidade;
  const elemMeta = ELEMENTOS_ORDEM[ent.getElemento()];
  const amuletos = ent.getAmuletosEquipados();

  const pctPV = Math.max(
    0,
    Math.min(100, (ent.getVida() / Math.max(1, ent.getVidaMax())) * 100)
  );
  const pctPE = Math.max(
    0,
    Math.min(100, (ent.getPE() / Math.max(1, ent.getPEMax())) * 100)
  );
  const pctSAN = Math.max(
    0,
    Math.min(100, (ent.getSanidade() / Math.max(1, ent.getSanidadeMax())) * 100)
  );

  return (
    <View
      style={[
        gameStyles.fighterCard,
        ehAtacante && gameStyles.fighterCardSelectedAttacker,
        ehAlvo && !ehAtacante && gameStyles.fighterCardSelectedTarget,
        !ent.estaVivo() && gameStyles.fighterCardDead,
      ]}
    >
      <View style={gameStyles.fighterCardHeader}>
        <View style={gameStyles.fighterIdentity}>
          <View
            style={[
              gameStyles.avatarBox,
              {
                backgroundColor: elemMeta.corFundo,
                borderColor: elemMeta.cor,
              },
            ]}
          >
            <Text style={gameStyles.avatarEmoji}>{ent.getEmoji()}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={gameStyles.fighterName}>
              {ent.getNome()}{' '}
              {!ent.estaVivo()
                ? '💀 (0 PV)'
                : ent.estaMachucado()
                ? '🩸 (Machucado)'
                : ''}
            </Text>
            <Text style={gameStyles.fighterSub}>{ent.getSubtitulo()}</Text>
            <View style={gameStyles.badgesWrap}>
              <View
                style={[
                  gameStyles.miniBadge,
                  {
                    backgroundColor: elemMeta.corFundo,
                    borderColor: elemMeta.corBorda,
                  },
                ]}
              >
                <Text style={[gameStyles.miniBadgeText, { color: elemMeta.cor }]}>
                  {elemMeta.emoji} {elemMeta.nome}
                </Text>
              </View>
              <View style={gameStyles.miniBadge}>
                <Text style={gameStyles.miniBadgeText}>
                  🛡️ DEF {ent.getDefesaTotal()}
                </Text>
              </View>
              <View style={gameStyles.miniBadge}>
                <Text style={gameStyles.miniBadgeText}>
                  🧱 RD {ent.getRDTotal()}
                </Text>
              </View>
              <View style={gameStyles.miniBadge}>
                <Text style={gameStyles.miniBadgeText}>
                  🎲 {ent.getDadosAtributoAcerto()}d20
                </Text>
              </View>
              {amuletos.length > 0 && (
                <View style={gameStyles.amuletBadge}>
                  <Text style={gameStyles.amuletBadgeText}>
                    📿 {amuletos.length}x Decorator
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Barras de PV, PE e SAN */}
      <View style={gameStyles.barsContainer}>
        <View style={gameStyles.barRow}>
          <View style={gameStyles.barLabelRow}>
            <Text style={gameStyles.barLabel}>❤️ VIDA (PV)</Text>
            <Text style={gameStyles.barValue}>
              {ent.getVida()} / {ent.getVidaMax()}
            </Text>
          </View>
          <View style={gameStyles.barTrack}>
            <View style={[gameStyles.barFillPV, { width: `${pctPV}%` }]} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={[gameStyles.barRow, { flex: 1 }]}>
            <View style={gameStyles.barLabelRow}>
              <Text style={gameStyles.barLabel}>⚡ ESFORÇO (PE)</Text>
              <Text style={gameStyles.barValue}>
                {ent.getPE()}/{ent.getPEMax()}
              </Text>
            </View>
            <View style={gameStyles.barTrack}>
              <View style={[gameStyles.barFillPE, { width: `${pctPE}%` }]} />
            </View>
          </View>

          <View style={[gameStyles.barRow, { flex: 1 }]}>
            <View style={gameStyles.barLabelRow}>
              <Text style={gameStyles.barLabel}>🧠 SANIDADE (SAN)</Text>
              <Text style={gameStyles.barValue}>
                {ent.getSanidade()}/{ent.getSanidadeMax()}
              </Text>
            </View>
            <View style={gameStyles.barTrack}>
              <View style={[gameStyles.barFillSAN, { width: `${pctSAN}%` }]} />
            </View>
          </View>
        </View>
      </View>

      {/* Botões de Controle Rápido do Combatente */}
      <View style={gameStyles.cardActionRow}>
        <TouchableOpacity
          style={[
            gameStyles.smallActionBtn,
            ehAtacante && gameStyles.smallActionBtnActiveAttacker,
          ]}
          onPress={() => onSelecionarAtacante(item)}
        >
          <Text style={gameStyles.smallActionBtnText}>
            {ehAtacante ? '✅ ATACANTE ATIVO' : '🗡️ Definir Atacante'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            gameStyles.smallActionBtn,
            ehAlvo && gameStyles.smallActionBtnActiveTarget,
          ]}
          onPress={() => onSelecionarAlvo(item)}
        >
          <Text style={gameStyles.smallActionBtnText}>
            {ehAlvo ? '🎯 ALVO ATUAL' : '🎯 Definir Alvo'}
          </Text>
        </TouchableOpacity>

        {podeRemover && (
          <TouchableOpacity
            style={gameStyles.smallActionBtn}
            onPress={() => onRemover(item.uid)}
          >
            <Text style={[gameStyles.smallActionBtnText, { color: '#FCA5A5' }]}>
              ✖ Remover
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
