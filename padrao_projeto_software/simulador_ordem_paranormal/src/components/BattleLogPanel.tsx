import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { RegistroLog } from '../patterns/singleton/BattleLogger';
import { gameStyles } from '../styles/theme';

interface BattleLogPanelProps {
  registrosLog: RegistroLog[];
}

export function BattleLogPanel({ registrosLog }: BattleLogPanelProps) {
  return (
    <View style={gameStyles.sectionCard}>
      <View style={gameStyles.sectionHeaderRow}>
        <Text style={gameStyles.sectionTitle}>
          📜 HISTÓRICO DO COMBATE ({registrosLog.length})
        </Text>
        <View style={gameStyles.patternPill}>
          <Text style={gameStyles.patternPillText}>Singleton + Observer</Text>
        </View>
      </View>

      <ScrollView style={gameStyles.logBox} nestedScrollEnabled>
        {registrosLog.length === 0 ? (
          <Text style={gameStyles.logEmpty}>
            Nenhum turno executado ainda. Selecione um atacante, um alvo e clique em Executar!
          </Text>
        ) : (
          registrosLog
            .slice()
            .reverse()
            .map((reg: RegistroLog) => (
              <View key={reg.id} style={gameStyles.logEntry}>
                <Text
                  style={[
                    gameStyles.logText,
                    reg.categoria === 'MESTRE' && gameStyles.logTextMasterAlert,
                    reg.categoria === 'CRITICO' && gameStyles.logTextCritical,
                    reg.categoria === 'OPRESSAO' && gameStyles.logTextOpressao,
                  ]}
                >
                  {reg.mensagem}
                </Text>
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}
