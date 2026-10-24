import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { gameStyles } from '../styles/theme';
import {
  CategoriaAcao,
  ConfigAcao,
  ELEMENTOS_ORDEM,
  ElementoOrdem,
  FaceDado,
  FACES_DADOS,
  TipoEfeitoAcao,
} from '../types/Elementos';

const LISTA_ELEMENTOS: ElementoOrdem[] = [
  'SANGUE',
  'MORTE',
  'CONHECIMENTO',
  'ENERGIA',
  'MEDO',
  'FISICO',
];

const LISTA_EFEITOS: { id: TipoEfeitoAcao; label: string }[] = [
  { id: 'DANO_PV', label: '🗡️ Dano em PV' },
  { id: 'DANO_SAN', label: '🌀 Dano Mental (SAN)' },
  { id: 'CURA_PV', label: '💚 Cura de PV' },
  { id: 'RECUPERAR_PE_SAN', label: '✨ Recuperar PE & SAN' },
  { id: 'BUFF_DEFESA_RD', label: '🛡️ Buff Defesa & RD' },
];

const LISTA_CATEGORIAS: CategoriaAcao[] = [
  'ARMA',
  'RITUAL',
  'HABILIDADE',
  'TATICA',
  'CRIATURA',
];

interface OficinaAcoesTabProps {
  onSalvarAcao: (novaAcao: ConfigAcao) => void;
}

export function OficinaAcoesTab({ onSalvarAcao }: OficinaAcoesTabProps) {
  const [formAcaoNome, setFormAcaoNome] = useState('Ritual: Hemofagia');
  const [formAcaoEmoji, setFormAcaoEmoji] = useState('🩸');
  const [formAcaoCat, setFormAcaoCat] = useState<CategoriaAcao>('RITUAL');
  const [formAcaoElem, setFormAcaoElem] = useState<ElementoOrdem>('SANGUE');
  const [formAcaoEfeito, setFormAcaoEfeito] = useState<TipoEfeitoAcao>('DANO_PV');
  const [formAcaoQtdDados, setFormAcaoQtdDados] = useState('3');
  const [formAcaoFaceDado, setFormAcaoFaceDado] = useState<FaceDado>(10);
  const [formAcaoBonusFixo, setFormAcaoBonusFixo] = useState('5');
  const [formAcaoBonusAcerto, setFormAcaoBonusAcerto] = useState('10');
  const [formAcaoMargemCrit, setFormAcaoMargemCrit] = useState('19');
  const [formAcaoMultCrit, setFormAcaoMultCrit] = useState('2');
  const [formAcaoCustoPE, setFormAcaoCustoPE] = useState('3');
  const [formAcaoCustoSAN, setFormAcaoCustoSAN] = useState('1');

  const salvar = () => {
    const novaAcao: ConfigAcao = {
      id: `acao_custom_${Date.now()}`,
      nome: formAcaoNome.trim() || 'Nova Ação',
      emoji: formAcaoEmoji.trim() || '🔮',
      categoria: formAcaoCat,
      elemento: formAcaoElem,
      efeito: formAcaoEfeito,
      qtdDados: Math.max(1, parseInt(formAcaoQtdDados, 10) || 1),
      faceDado: formAcaoFaceDado,
      bonusFixo: parseInt(formAcaoBonusFixo, 10) || 0,
      bonusAcerto: parseInt(formAcaoBonusAcerto, 10) || 0,
      margemCritico: Math.min(20, Math.max(1, parseInt(formAcaoMargemCrit, 10) || 20)),
      multiplicadorCritico: Math.max(2, parseInt(formAcaoMultCrit, 10) || 2),
      custoPE: Math.max(0, parseInt(formAcaoCustoPE, 10) || 0),
      custoSAN: Math.max(0, parseInt(formAcaoCustoSAN, 10) || 0),
      descricao: 'Ação personalizada criada na oficina offline.',
    };
    onSalvarAcao(novaAcao);
  };

  return (
    <View style={gameStyles.sectionCard}>
      <View style={gameStyles.sectionHeaderRow}>
        <Text style={gameStyles.sectionTitle}>
          🔮 CRIAR ARMA, RITUAL OU ATAQUE CUSTOMIZADO
        </Text>
        <View style={gameStyles.patternPill}>
          <Text style={gameStyles.patternPillText}>Strategy</Text>
        </View>
      </View>

      <View style={gameStyles.rowInputs}>
        <View style={[gameStyles.colInput, { flex: 3 }]}>
          <Text style={gameStyles.inputLabel}>Nome da Ação / Ritual:</Text>
          <TextInput
            style={gameStyles.textInput}
            value={formAcaoNome}
            onChangeText={setFormAcaoNome}
          />
        </View>
        <View style={[gameStyles.colInput, { flex: 1 }]}>
          <Text style={gameStyles.inputLabel}>Emoji:</Text>
          <TextInput
            style={gameStyles.textInput}
            value={formAcaoEmoji}
            onChangeText={setFormAcaoEmoji}
          />
        </View>
      </View>

      <View style={[gameStyles.formGroup, { marginTop: 8 }]}>
        <Text style={gameStyles.inputLabel}>Categoria:</Text>
        <View style={gameStyles.chipsSelectorRow}>
          {LISTA_CATEGORIAS.map((cat: CategoriaAcao) => (
            <TouchableOpacity
              key={cat}
              style={[
                gameStyles.chipOption,
                formAcaoCat === cat && gameStyles.chipOptionActive,
              ]}
              onPress={() => setFormAcaoCat(cat)}
            >
              <Text
                style={[
                  gameStyles.chipOptionText,
                  formAcaoCat === cat && gameStyles.chipOptionTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={gameStyles.formGroup}>
        <Text style={gameStyles.inputLabel}>Elemento da Ação:</Text>
        <View style={gameStyles.chipsSelectorRow}>
          {LISTA_ELEMENTOS.map((el: ElementoOrdem) => {
            const meta = ELEMENTOS_ORDEM[el];
            const ativo = formAcaoElem === el;
            return (
              <TouchableOpacity
                key={el}
                style={[
                  gameStyles.chipOption,
                  ativo && gameStyles.chipOptionActive,
                ]}
                onPress={() => setFormAcaoElem(el)}
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
        <Text style={gameStyles.inputLabel}>Tipo de Efeito:</Text>
        <View style={gameStyles.chipsSelectorRow}>
          {LISTA_EFEITOS.map((ef) => (
            <TouchableOpacity
              key={ef.id}
              style={[
                gameStyles.chipOption,
                formAcaoEfeito === ef.id && gameStyles.chipOptionActive,
              ]}
              onPress={() => setFormAcaoEfeito(ef.id)}
            >
              <Text
                style={[
                  gameStyles.chipOptionText,
                  formAcaoEfeito === ef.id && gameStyles.chipOptionTextActive,
                ]}
              >
                {ef.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={gameStyles.formGroup}>
        <Text style={gameStyles.inputLabel}>
          Tipo de Dado da Rolagem (Faces):
        </Text>
        <View style={gameStyles.chipsSelectorRow}>
          {FACES_DADOS.map((face: FaceDado) => (
            <TouchableOpacity
              key={face}
              style={[
                gameStyles.chipOption,
                formAcaoFaceDado === face && gameStyles.chipOptionActive,
              ]}
              onPress={() => setFormAcaoFaceDado(face)}
            >
              <Text
                style={[
                  gameStyles.chipOptionText,
                  formAcaoFaceDado === face && gameStyles.chipOptionTextActive,
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
          <Text style={gameStyles.inputLabel}>Qtd. de Dados:</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAcaoQtdDados}
            onChangeText={setFormAcaoQtdDados}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Bônus Fixo (+):</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAcaoBonusFixo}
            onChangeText={setFormAcaoBonusFixo}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Bônus Acerto:</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAcaoBonusAcerto}
            onChangeText={setFormAcaoBonusAcerto}
          />
        </View>
      </View>

      <View style={[gameStyles.rowInputs, { marginTop: 8 }]}>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Margem Crítico (1-20):</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAcaoMargemCrit}
            onChangeText={setFormAcaoMargemCrit}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Mult. Crítico (x2, x3):</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAcaoMultCrit}
            onChangeText={setFormAcaoMultCrit}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Custo PE:</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAcaoCustoPE}
            onChangeText={setFormAcaoCustoPE}
          />
        </View>
        <View style={gameStyles.colInput}>
          <Text style={gameStyles.inputLabel}>Custo SAN:</Text>
          <TextInput
            style={gameStyles.textInput}
            keyboardType="numeric"
            value={formAcaoCustoSAN}
            onChangeText={setFormAcaoCustoSAN}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[gameStyles.primaryAttackBtn, { marginTop: 14 }]}
        onPress={salvar}
      >
        <Text style={gameStyles.primaryAttackBtnText}>
          💾 SALVAR AÇÃO ({formAcaoQtdDados}d{formAcaoFaceDado}+
          {formAcaoBonusFixo}) E USAR NA ARENA
        </Text>
      </TouchableOpacity>
    </View>
  );
}
