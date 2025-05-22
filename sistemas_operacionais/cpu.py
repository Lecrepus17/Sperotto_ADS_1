import time
import signal
import random
from processo import Processo

class CPU:
    def __init__(self, quantum, num_processos, tempo_simulacao):
        self.quantum = quantum
        self.tempo_simulacao = tempo_simulacao
        self.num_processos = num_processos
        self.fila = []
        self.estatisticas = {
            "total_processos": 0,
            "tempos": [],
            "tempo_simulacao": 0,
        }
        self.pid_contador = 1
        self.rodando = True

        # Captura Ctrl+C
        signal.signal(signal.SIGINT, self.interromper_simulacao)

    def interromper_simulacao(self, sig, frame):
        print("\n🛑 Simulação interrompida pelo usuário (Ctrl+C)")
        self.rodando = False

    def gerar_processo(self):
        tipo = "CPU" if random.random() > 0.5 else "IO"
        tempo_execucao = random.randint(4, 15) if tipo == "CPU" else random.randint(2, 8)
        processo = Processo(f"P{self.pid_contador}", tempo_execucao, tipo)
        self.pid_contador += 1
        return processo

    def adicionar_processo(self, processo):
        self.fila.append(processo)
        self.estatisticas["total_processos"] += 1

    def executar(self):
        print(f"\n🎬 Iniciando simulação Round-Robin (quantum = {self.quantum})")
        inicio = time.time()

        while self.rodando and time.time() - inicio < self.tempo_simulacao:
            # Geração de novos processos
            while len(self.fila) < self.num_processos:
                self.adicionar_processo(self.gerar_processo())

            if self.fila:
                processo = self.fila.pop(0)
                print(f"\n⏳ Executando {processo}")
                tempo_executado = processo.executar(self.quantum)
                time.sleep(0.5)  # Simulação visual

                if processo.finalizado():
                    print(f"✅ {processo.pid} finalizado em {processo.tempo_total} unidades")
                    self.estatisticas["tempos"].append(processo.tempo_total)
                else:
                    self.fila.append(processo)
            else:
                print("🔁 Nenhum processo na fila. Esperando...")
                time.sleep(1)

        self.estatisticas["tempo_simulacao"] = round(time.time() - inicio)
        self.mostrar_estatisticas()

    def mostrar_estatisticas(self):
        print("\n📊 Estatísticas da simulação:")
        tempos = self.estatisticas["tempos"]
        if tempos:
            print(f"🧮 Total de processos executados: {self.estatisticas['total_processos']}")
            print(f"⏱️ Tempo total de simulação: {self.estatisticas['tempo_simulacao']}s")
            print(f"📈 Maior tempo de execução: {max(tempos)}")
            print(f"📉 Menor tempo de execução: {min(tempos)}")
            print(f"📊 Média de tempo: {sum(tempos) / len(tempos):.2f}")
        else:
            print("⚠️ Nenhum processo foi finalizado.")

# Executar se for o arquivo principal
if __name__ == "__main__":
    quantum = random.randint(1, 6)
    num_processos = 2
    tempo_simulacao = 30 # em segundos

    cpu = CPU(quantum=quantum, num_processos=num_processos, tempo_simulacao=tempo_simulacao)
    cpu.executar()
