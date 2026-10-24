import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { gameStyles } from '../styles/theme';
import {
  ConfigAcao,
  ConfigCombatente,
  ELEMENTOS_ORDEM,
  ElementoOrdem,
} from '../types/Elementos';

const LISTA_ELEMENTOS: ElementoOrdem[] = [
  'SANGUE',
  'MORTE',
  'CONHECIMENTO',
  'ENERGIA',
  'MEDO',
  'FISICO',
];

interface OficinaCombatentesTabProps {
  catalogoAcoes: ConfigAcao[];
  onSalvarCombatente: (
    novo: ConfigCombatente,
    adicionarDiretoNaArena: boolean
  ) => void;
}

export function OficinaCombatentesTab({
  catalogoAcoes,
  onSalvarCombatente,
}: OficinaCombatentesTabProps) {
  const [formCombTipo, setFormCombTipo] = useState<'AGENTE' | 'CRIATURA'>(
    'AGENTE'
  );
  const [formCombNome, setFormCombNome] = useState('Novo Agente da Ordem');
  const [formCombEmoji, setFormCombEmoji] = useState('🕵️');
  const [formCombSub, setFormCombSub] = useState('Combatente • NEX 50%');
  const [formCombElem, setFormCombElem] = useState<ElementoOrdem>('SANGUE');
  const [formCombPV, setFormCombPV] = useState('110');
  const [formCombPE, setFormCombPE] = useState('45');
  const [formCombSAN, setFormCombSAN] = useState('60');
  const [formCombDef, setFormCombDef] = useState('18');
  const [formCombRD, setFormCombRD] = useState('4');
  const [formCombD20, setFormCombD20] = useState('3');
  const [formCombAcaoId, setFormCombAcaoId] = useState(
    () => catalogoAcoes[0]?.id ?? 'acao_ataque_fisico'
  );

  const criarConfig = (): ConfigCombatente => ({
    id: `${formCombTipo.toLowerCase()}_custom_${Date.now()}`,
    nome: formCombNome.trim() || 'Combatente sem Nome',
    emoji: formCombEmoji.trim() || (formCombTipo === 'AGENTE' ? '🕵️' : '🧟'),
    tipo: formCombTipo,
    subtitulo:
      formCombSub.trim() ||
      (formCombTipo === 'AGENTE' ? 'Agente da Ordem' : 'Criatura Paranormal'),
    elemento: formCombElem,
    vidaMax: Math.max(1, parseInt(formCombPV, 10) || 100),
    peMax: Math.max(0, parseInt(formCombPE, 10) || 40),
    sanMax: Math.max(1, parseInt(formCombSAN, 10) || 50),
    defesa: Math.max(1, parseInt(formCombDef, 10) || 15),
    rd: Math.max(0, parseInt(formCombRD, 10) || 0),
    dadosAtributoAcerto: Math.max(1, parseInt(formCombD20, 10) || 3),
    acaoPadraoId: formCombAcaoId,
    amuletosIds: [],
  });

  return (
    <View style={gameStyles.sectionCard}>
      <View style={gameStyles.sectionHeaderRow}>
        <Text style={gameStyles.sectionTitle}>
          🕵️ CRIAR NOVA PESSOA OU MONSTRO
        </Text>
        <View style={gameStyles.patternPill}>
          <Text style={gameStyles.patternPillText}>Factory Method</Text>
        </View>
      </View>

      <View style={gameStyles.formGroup}>
        <Text style={gameStyles.inputLabel}>Tipo de Entidade:</Text>
        <View style={gameStyles.chipsSelectorRow}>
          {(['AGENTE', 'CRIATURA'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                gameStyles.chipOption,
                formCombTipo === t && gameStyles.chipOptionActive,
              ]}
              onPress={() => {
                setFormCombTipo(t);
                setFormCombEmoji(t === 'AGENTE' ? '🕵️' : '👹');
              }}
            >
              <Text
                style={[
                  gameStyles.chipOptionText,
                  formCombTipo === t && gameStyles.chipOptionTextActive,
                ]}
              >
                {t === 'AGENTE' ? '🕵️ Pessoa / Agente' : '👹 Monstro / Criatura'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={gameStyles.rowInputs}>
        <View style={[gameStyles.colInput, { flex: 3 }]}>
          <Text style={gameStyles.inputLabel}>Nome:</Text>
          <TextInput
            style={gameStyles.textInput}
            value={formCombNome}
            onChangeText={setFormCombNome}
          />
        </View>
        <View style={[gameStyles.colInput, { flex: 1 }]}>
          <Text style={gameStyles.inputLabel}>Emoji:</Text>
          <TextInput
            style={gameStyles.textInput}
            value={formCombEmoji}
            onChangeText={setFormCombEmoji}
          />
        </View>
      </View>

      <View style={[gameStyles.formGroup, { marginTop: 8 }]}>
        <Text style={gameStyles.inputLabel}>Subtítulo (Classe / NEX / VD):</Text>
        <TextInput
          style={gameStyles.textInput}
          value={formCombSub}
          onChangeText={setFormCombSub}
        />
      </View>

      <View style={gameStyles.formGroup}>
        <Text style={gameStyles.inputLabel}>Elemento Afinado / Nativo:</Text>
        <View style={gameStyles.chipsSelectorRow}>
          {LISTA_ELEMENTOS.map((el: ElementoOrdem) => {
            const meta = ELEMENTOS_ORDEM[el];
            const ativo = formCombElem === el;
            return (
              <TouchableOpacity
                key={el}
                style={[
                  gameStyles.chipOption,
                  ativo && gameStyles.chipOptionActive,
                ]}
                onPress={() => setFormCombElem(el)}
              >
                <Text
                  style={[
                    gameStyles.chipOptionText,
                    ativo && gameStyles.chipOptionTextActive,
                  ]}
                >
                  {meta.emoji} {meta.nome}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={gameStyles.rowInputs}>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Vida Máx (PV):</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formCombPV}
            onChangeText={setFormCombPV}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Esforço (PE):</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formCombPE}
            onChangeText={setFormCombPE}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Sanidade (SAN):</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formCombSAN}
            onChangeText={setFormCombSAN}
          />
        </View>
      </View>

      <View style={[gameStyles.rowInputs, { marginTop: 8 }]}>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Defesa Base:</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formCombDef}
            onChangeText={setFormCombDef}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>RD Base:</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formCombRD}
            onChangeText={setFormCombRD}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Dados Ataque (d20):</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formCombD20}
            onChangeText={setFormCombD20}
          />
        </View>
      </View>

      <View style={[gameStyles.formGroup, { marginTop: 10 }]}>
        <Text style={gameStyles.inputLabel}>Ação Padrão Inicial:</Text>
        <View style={gameStyles.chipsSelectorRow}>
          {catalogoAcoes.map((ac: ConfigAcao) => (
            <TouchableOpacity
              key={ac.id}
              style={[
                gameStyles.chipOption,
                formCombAcaoId === ac.id && gameStyles.chipOptionActive,
              ]}
              onPress={() => setFormCombAcaoId(ac.id)}
            >
              <Text
                style={[
                  gameStyles.chipOptionText,
                  formCombAcaoId === ac.id && gameStyles.chipOptionTextActive,
                ]}
              >
                {ac.emoji} {ac.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={gameStyles.secondaryRow}>
        <TouchableOpacity
          style={gameStyles.primaryAttackBtn}
          onPress={() => onSalvarCombatente(criarConfig(), true)}
        >
          <Text style={gameStyles.primaryAttackBtnText}>
            ➕ SALVAR E COLOCAR NA ARENA AGORA
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
