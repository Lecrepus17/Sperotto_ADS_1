import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, gameStyles } from '../styles/theme';
import {
  ConfigRegrasMesa,
  FaceDado,
  FACES_DADOS,
  rolarDado,
} from '../types/Elementos';

interface RoladorRegrasTabProps {
  regras: ConfigRegrasMesa;
  onAlternarRegra: (chave: keyof ConfigRegrasMesa) => void;
  onExportarJSON: () => string;
  onImportarJSON: (json: string) => { sucesso: boolean; mensagem: string };
  onRestaurarPadroes: () => void;
}

export function RoladorRegrasTab({
  regras,
  onAlternarRegra,
  onExportarJSON,
  onImportarJSON,
  onRestaurarPadroes,
}: RoladorRegrasTabProps) {
  const [roladorQtd, setRoladorQtd] = useState('3');
  const [roladorFace, setRoladorFace] = useState<FaceDado>(20);
  const [roladorBonus, setRoladorBonus] = useState('5');
  const [resultadoRoladorLivre, setResultadoRoladorLivre] = useState<{
    dados: number[];
    face: FaceDado;
    bonus: number;
    somaTotal: number;
    maiorDadoTotal: number;
    menorDado: number;
  } | null>(null);

  const [jsonBackupTexto, setJsonBackupTexto] = useState('');
  const [statusBackupMsg, setStatusBackupMsg] = useState('');

  const executarRolagemLivre = () => {
    const qtd = Math.min(50, Math.max(1, parseInt(roladorQtd, 10) || 1));
    const bonus = parseInt(roladorBonus, 10) || 0;
    const dados: number[] = [];
    for (let i = 0; i < qtd; i++) {
      dados.push(rolarDado(roladorFace));
    }
    const somaDados = dados.reduce((acc, v) => acc + v, 0);
    const maior = Math.max(...dados);
    const menor = Math.min(...dados);
    setResultadoRoladorLivre({
      dados,
      face: roladorFace,
      bonus,
      somaTotal: somaDados + bonus,
      maiorDadoTotal: maior + bonus,
      menorDado: menor,
    });
  };

  return (
    <>
      {/* ROLADOR LIVRE DE DADOS */}
      <View style={gameStyles.sectionCard}>
        <View style={gameStyles.sectionHeaderRow}>
          <Text style={gameStyles.sectionTitle}>
            🎲 ROLADOR DE DADOS LIVRE (d4 até d100)
          </Text>
          <View style={gameStyles.patternPill}>
            <Text style={gameStyles.patternPillText}>Qualquer Dado</Text>
          </View>
        </View>

        <View style={gameStyles.formGroup}>
          <Text style={gameStyles.inputLabel}>Escolha o Dado:</Text>
          <View style={gameStyles.chipsSelectorRow}>
            {FACES_DADOS.map((face: FaceDado) => (
              <TouchableOpacity
                key={face}
                style={[
                  gameStyles.chipOption,
                  roladorFace === face && gameStyles.chipOptionActive,
                ]}
                onPress={() => setRoladorFace(face)}
              >
                <Text
                  style={[
                    gameStyles.chipOptionText,
                    roladorFace === face && gameStyles.chipOptionTextActive,
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
            <Text style={gameStyles.inputLabel}>Quantidade de Dados:</Text>
            <TextInput
              style={gameStyles.textInput}
              keyboardType="numeric"
              value={roladorQtd}
              onChangeText={setRoladorQtd}
            />
          </View>
          <View style={gameStyles.colInput}>
            <Text style={gameStyles.inputLabel}>Bônus Fixo (+):</Text>
            <TextInput
              style={gameStyles.textInput}
              keyboardType="numeric"
              value={roladorBonus}
              onChangeText={setRoladorBonus}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[gameStyles.primaryAttackBtn, { marginTop: 10 }]}
          onPress={executarRolagemLivre}
        >
          <Text style={gameStyles.primaryAttackBtnText}>
            🎲 ROLAR {roladorQtd}d{roladorFace} + {roladorBonus}
          </Text>
        </TouchableOpacity>

        {resultadoRoladorLivre && (
          <View
            style={[
              gameStyles.damageXRayCard,
              { marginTop: 12, marginBottom: 0 },
            ]}
          >
            <Text style={gameStyles.inputLabel}>
              Dados Individuais Rolados ({resultadoRoladorLivre.dados.length}d
              {resultadoRoladorLivre.face}):
            </Text>
            <View style={gameStyles.diceChipsRow}>
              {resultadoRoladorLivre.dados.map((v: number, i: number) => (
                <View key={i} style={gameStyles.dieChipBase}>
                  <Text style={gameStyles.dieChipText}>
                    d{resultadoRoladorLivre.face}: {v}
                  </Text>
                </View>
              ))}
            </View>
            <View style={gameStyles.mathStepRow}>
              <Text style={gameStyles.mathStepLabel}>
                Soma de Todos os Dados + Bônus ({resultadoRoladorLivre.bonus}):
              </Text>
              <Text style={gameStyles.mathTotalValue}>
                {resultadoRoladorLivre.somaTotal}
              </Text>
            </View>
            <View style={gameStyles.mathStepRow}>
              <Text style={gameStyles.mathStepLabel}>
                Maior Dado + Bônus (Estilo Teste Ordem):
              </Text>
              <Text style={gameStyles.mathStepValue}>
                {resultadoRoladorLivre.maiorDadoTotal}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* REGRAS DA MESA & CICLO ELEMENTAL */}
      <View style={gameStyles.sectionCard}>
        <View style={gameStyles.sectionHeaderRow}>
          <Text style={gameStyles.sectionTitle}>
            ⚙️ REGRAS DA MESA & CICLO DE ELEMENTOS
          </Text>
          <View style={gameStyles.patternPill}>
            <Text style={gameStyles.patternPillText}>Singleton Offline</Text>
          </View>
        </View>

        <Text style={gameStyles.sectionSubtitle}>
          Ciclo Oficial: 🩸 Sangue ➔ 🧠 Conhecimento ➔ ⚡ Energia ➔ 💀 Morte ➔ 🩸 Sangue (2x Dano)
        </Text>

        <View style={gameStyles.actionsGrid}>
          {(
            [
              {
                chave: 'usarTesteAcerto',
                titulo: '🎯 Exigir Teste de Ataque (Xd20 + Perícia vs Defesa)',
              },
              {
                chave: 'aplicarRD',
                titulo: '🧱 Aplicar Redução de Dano (RD) dos Alvos',
              },
              {
                chave: 'gastarPEeSAN',
                titulo: '⚡ Descontar Custo de PE e SAN ao Usar Rituais',
              },
              {
                chave: 'contraAtaqueAutomatico',
                titulo: '👹 Contra-Ataque Automático das Criaturas',
              },
              {
                chave: 'contraAtaqueTodosVivos',
                titulo: '🔥 Todos os Monstros Vivos Contra-Atacam no Turno',
              },
            ] as { chave: keyof ConfigRegrasMesa; titulo: string }[]
          ).map((item) => {
            const ativo = Boolean(regras[item.chave]);
            return (
              <TouchableOpacity
                key={item.chave}
                style={[
                  gameStyles.actionOptionCard,
                  ativo && gameStyles.actionOptionCardActive,
                ]}
                onPress={() => onAlternarRegra(item.chave)}
              >
                <Text
                  style={{
                    color: COLORS.textPrimary,
                    fontWeight: '800',
                    fontSize: 12,
                  }}
                >
                  {ativo ? '✅ ATIVADO: ' : '⬜ DESATIVADO: '}
                  {item.titulo}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Exportar / Importar Backup JSON Offline */}
        <View style={[gameStyles.secondaryRow, { marginTop: 12 }]}>
          <TouchableOpacity
            style={gameStyles.goldBtn}
            onPress={() => {
              setJsonBackupTexto(onExportarJSON());
              setStatusBackupMsg(
                'JSON exportado abaixo! Copie para salvar backup.'
              );
            }}
          >
            <Text style={gameStyles.goldBtnText}>📤 Gerar Backup JSON</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={gameStyles.secondaryBtn}
            onPress={() => {
              const res = onImportarJSON(jsonBackupTexto);
              setStatusBackupMsg(res.mensagem);
            }}
          >
            <Text style={gameStyles.secondaryBtnText}>📥 Importar JSON</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={gameStyles.secondaryBtn}
            onPress={() => {
              onRestaurarPadroes();
              setStatusBackupMsg(
                'Catálogo restaurado para os padrões de fábrica!'
              );
            }}
          >
            <Text style={gameStyles.secondaryBtnText}>🔄 Restaurar Padrões</Text>
          </TouchableOpacity>
        </View>

        {statusBackupMsg ? (
          <Text
            style={{
              color: COLORS.goldLight,
              fontSize: 11,
              marginTop: 8,
              textAlign: 'center',
            }}
          >
            {statusBackupMsg}
          </Text>
        ) : null}

        {jsonBackupTexto ? (
          <TextInput
            style={[
              gameStyles.textInput,
              { marginTop: 8, minHeight: 90, fontFamily: 'monospace' },
            ]}
            multiline
            value={jsonBackupTexto}
            onChangeText={setJsonBackupTexto}
          />
        ) : null}
      </View>
    </>
  );
}
