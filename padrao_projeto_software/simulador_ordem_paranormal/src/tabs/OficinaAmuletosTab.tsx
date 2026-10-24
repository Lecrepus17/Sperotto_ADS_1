import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { gameStyles } from '../styles/theme';
import {
  ConfigAmuletoDecorator,
  ELEMENTOS_ORDEM,
  ElementoOrdem,
  FaceDado,
  FACES_DADOS,
} from '../types/Elementos';

const LISTA_ELEMENTOS: ElementoOrdem[] = [
  'SANGUE',
  'MORTE',
  'CONHECIMENTO',
  'ENERGIA',
  'MEDO',
  'FISICO',
];

interface OficinaAmuletosTabProps {
  nomeAtacanteAtivo: string;
  onSalvarAmuleto: (
    novoAmuleto: ConfigAmuletoDecorator,
    equiparImediatamente: boolean
  ) => void;
}

export function OficinaAmuletosTab({
  nomeAtacanteAtivo,
  onSalvarAmuleto,
}: OficinaAmuletosTabProps) {
  const [formAmulNome, setFormAmulNome] = useState('Maldição Sanguinária');
  const [formAmulEmoji, setFormAmulEmoji] = useState('📿');
  const [formAmulElem, setFormAmulElem] = useState<ElementoOrdem>('SANGUE');
  const [formAmulDanoFixo, setFormAmulDanoFixo] = useState('4');
  const [formAmulQtdDados, setFormAmulQtdDados] = useState('1');
  const [formAmulFaceDado, setFormAmulFaceDado] = useState<FaceDado>(8);
  const [formAmulAcerto, setFormAmulAcerto] = useState('2');
  const [formAmulDefesa, setFormAmulDefesa] = useState('2');
  const [formAmulRD, setFormAmulRD] = useState('2');

  const salvar = () => {
    const novoAmuleto: ConfigAmuletoDecorator = {
      id: `amuleto_custom_${Date.now()}`,
      nome: formAmulNome.trim() || 'Amuleto Paranormal',
      emoji: formAmulEmoji.trim() || '📿',
      elemento: formAmulElem,
      bonusDanoFixo: parseInt(formAmulDanoFixo, 10) || 0,
      qtdDadosExtras: Math.max(0, parseInt(formAmulQtdDados, 10) || 0),
      faceDadoExtra: formAmulFaceDado,
      bonusAcerto: parseInt(formAmulAcerto, 10) || 0,
      bonusDefesa: parseInt(formAmulDefesa, 10) || 0,
      bonusRD: parseInt(formAmulRD, 10) || 0,
      descricao: 'Item paranormal customizado.',
    };
    onSalvarAmuleto(novoAmuleto, true);
  };

  return (
    <View style={gameStyles.sectionCard}>
      <View style={gameStyles.sectionHeaderRow}>
        <Text style={gameStyles.sectionTitle}>
          📿 CRIAR AMULETO OU MALDIÇÃO PARANORMAL
        </Text>
        <View style={gameStyles.patternPill}>
          <Text style={gameStyles.patternPillText}>Decorator</Text>
        </View>
      </View>

      <View style={gameStyles.rowInputs}>
        <View style={[gameStyles.colInput, { flex: 3 }]}>
          <Text style={gameStyles.inputLabel}>Nome do Amuleto / Maldição:</Text>
          <TextInput
            style={gameStyles.textInput}
            value={formAmulNome}
            onChangeText={setFormAmulNome}
          />
        </View>
        <View style={[gameStyles.colInput, { flex: 1 }]}>
          <Text style={gameStyles.inputLabel}>Emoji:</Text>
          <TextInput
            style={gameStyles.textInput}
            value={formAmulEmoji}
            onChangeText={setFormAmulEmoji}
          />
        </View>
      </View>

      <View style={[gameStyles.formGroup, { marginTop: 8 }]}>
        <Text style={gameStyles.inputLabel}>Elemento do Item:</Text>
        <View style={gameStyles.chipsSelectorRow}>
          {LISTA_ELEMENTOS.map((el: ElementoOrdem) => {
            const meta = ELEMENTOS_ORDEM[el];
            const ativo = formAmulElem === el;
            return (
              <TouchableOpacity
                key={el}
                style={[
                  gameStyles.chipOption,
                  ativo && gameStyles.chipOptionActive,
                ]}
                onPress={() => setFormAmulElem(el)}
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

      <View style={gameStyles.formGroup}>
        <Text style={gameStyles.inputLabel}>
          Tipo de Dado Extra do Amuleto:
        </Text>
        <View style={gameStyles.chipsSelectorRow}>
          {FACES_DADOS.map((face: FaceDado) => (
            <TouchableOpacity
              key={face}
              style={[
                gameStyles.chipOption,
                formAmulFaceDado === face && gameStyles.chipOptionActive,
              ]}
              onPress={() => setFormAmulFaceDado(face)}
            >
              <Text
                style={[
                  gameStyles.chipOptionText,
                  formAmulFaceDado === face && gameStyles.chipOptionTextActive,
                ]}
              >
                🎲 d{face}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={gameStyles.rowInputs}>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Dano Fixo (+):</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAmulDanoFixo}
            onChangeText={setFormAmulDanoFixo}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Qtd. Dados Extras:</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAmulQtdDados}
            onChangeText={setFormAmulQtdDados}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Bônus Acerto:</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAmulAcerto}
            onChangeText={setFormAmulAcerto}
          />
        </View>
      </View>

      <View style={[gameStyles.rowInputs, { marginTop: 8 }]}>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Bônus Defesa:</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAmulDefesa}
            onChangeText={setFormAmulDefesa}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Bônus RD:</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAmulRD}
            onChangeText={setFormAmulRD}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[gameStyles.primaryAttackBtn, { marginTop: 14 }]}
        onPress={salvar}
      >
        <Text style={gameStyles.primaryAttackBtnText}>
          📿 SALVAR E EQUIPAR EM {nomeAtacanteAtivo.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
