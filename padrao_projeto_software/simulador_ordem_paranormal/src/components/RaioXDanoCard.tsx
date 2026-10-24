import React from 'react';
import { Text, View } from 'react-native';
import { COLORS, gameStyles } from '../styles/theme';
import {
  DadoIndividual,
  DetalheDecoratorAplicado,
  ResultadoAcao,
} from '../types/Elementos';

interface RaioXDanoCardProps {
  resultado: ResultadoAcao;
}

export function RaioXDanoCard({ resultado }: RaioXDanoCardProps) {
  return (
    <View style={gameStyles.damageXRayCard}>
      <View style={gameStyles.sectionHeaderRow}>
        <Text style={[gameStyles.sectionTitle, { color: COLORS.goldLight }]}>
          🔍 RAIO-X DO CÁLCULO ({resultado.acaoEmoji} {resultado.acaoNome})
        </Text>
        <View style={gameStyles.amuletBadge}>
          <Text style={gameStyles.amuletBadgeText}>
            {resultado.critico
              ? `🔥 CRÍTICO x${resultado.multiplicadorCriticoUsado}`
              : resultado.acertou
              ? '✅ ACERTOU'
              : '❌ ERROU'}
          </Text>
        </View>
      </View>

      <Text style={{ color: COLORS.textSecondary, fontSize: 12, marginBottom: 6 }}>
        {resultado.atacanteEmoji} {resultado.atacanteNome} ➔ {resultado.alvoEmoji}{' '}
        {resultado.alvoNome}
      </Text>

      {/* Dados de Teste de Ataque (Xd20) */}
      {resultado.dadosAcerto.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <Text style={gameStyles.inputLabel}>
            🎯 Teste de Ataque ({resultado.dadosAcerto.length}d20 ➔ Maior:{' '}
            {resultado.maiorDadoAcerto} + Bônus {resultado.bonusAcertoTotal} ={' '}
            {resultado.totalAcerto} vs Defesa {resultado.defesaAlvo}):
          </Text>
          <View style={gameStyles.diceChipsRow}>
            {resultado.dadosAcerto.map((val: number, idx: number) => (
              <View key={`d20-${idx}`} style={gameStyles.dieChipBase}>
                <Text style={gameStyles.dieChipText}>🎲 d20: {val}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Chips Visuais de Todos os Dados de Dano Rolados */}
      {resultado.acertou && (
        <>
          <Text style={gameStyles.inputLabel}>
            🎲 Dados Rolados Individualmente:
          </Text>
          <View style={gameStyles.diceChipsRow}>
            {resultado.dadosBaseRolados.map((d: DadoIndividual, i: number) => (
              <View key={`base-${i}`} style={gameStyles.dieChipBase}>
                <Text style={gameStyles.dieChipText}>
                  d{d.faces}: {d.valor}
                </Text>
              </View>
            ))}
            {resultado.dadosCriticoRolados.map((d: DadoIndividual, i: number) => (
              <View key={`crit-${i}`} style={gameStyles.dieChipCrit}>
                <Text style={gameStyles.dieChipText}>
                  🔥 d{d.faces} (Crít): {d.valor}
                </Text>
              </View>
            ))}
            {resultado.decoratorsAplicados.map((dec: DetalheDecoratorAplicado) =>
              dec.dadosExtrasRolados.map((d: DadoIndividual, i: number) => (
                <View
                  key={`dec-${dec.id}-${i}`}
                  style={gameStyles.dieChipDecorator}
                >
                  <Text style={gameStyles.dieChipText}>
                    {dec.emoji} d{d.faces}: {d.valor}
                  </Text>
                </View>
              ))
            )}
          </View>

          {/* Passo a Passo da Matemática do Dano */}
          <View style={{ marginTop: 6 }}>
            <View style={gameStyles.mathStepRow}>
              <Text style={gameStyles.mathStepLabel}>
                1. Soma dos Dados da Arma/Ritual:
              </Text>
              <Text style={gameStyles.mathStepValue}>
                {resultado.somaDadosArma}
              </Text>
            </View>

            <View style={gameStyles.mathStepRow}>
              <Text style={gameStyles.mathStepLabel}>
                2. Bônus Fixo da Ação:
              </Text>
              <Text style={gameStyles.mathStepValue}>
                +{resultado.bonusFixoAcao}
              </Text>
            </View>

            <View style={gameStyles.mathStepRow}>
              <Text style={gameStyles.mathStepLabel}>
                3. Amuletos / Decorators ({resultado.decoratorsAplicados.length}x):
              </Text>
              <Text style={gameStyles.mathStepValue}>
                +{resultado.somaBonusFixoDecorators} fixo / +
                {resultado.somaDadosDecorators} dados
              </Text>
            </View>

            <View style={gameStyles.mathStepRow}>
              <Text style={gameStyles.mathStepLabel}>4. Subtotal Bruto:</Text>
              <Text style={gameStyles.mathStepValue}>
                {resultado.subtotalAntesElemento}
              </Text>
            </View>

            <View style={gameStyles.mathStepRow}>
              <Text style={gameStyles.mathStepLabel}>
                5. Relação Elemental ({resultado.relacaoElemental}):
              </Text>
              <Text style={gameStyles.mathStepValue}>
                ×{resultado.multiplicadorElementalAplicado} ➔{' '}
                {resultado.subtotalAposElemento}
              </Text>
            </View>

            <View style={gameStyles.mathStepRow}>
              <Text style={gameStyles.mathStepLabel}>
                6. Redução de Dano (RD do Alvo):
              </Text>
              <Text style={gameStyles.mathStepValue}>
                -{resultado.rdAlvoAplicada}
              </Text>
            </View>

            <View style={gameStyles.mathTotalRow}>
              <Text style={gameStyles.mathTotalLabel}>
                RESULTADO FINAL APLICADO:
              </Text>
              <Text style={gameStyles.mathTotalValue}>
                {resultado.valorFinal}{' '}
                {resultado.efeito === 'DANO_SAN'
                  ? 'SAN'
                  : resultado.efeito === 'CURA_PV'
                  ? 'PV Curados'
                  : 'PV'}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
