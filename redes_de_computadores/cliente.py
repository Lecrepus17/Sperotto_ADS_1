import socket
import struct
import zlib
import os
import random

IP_SERVIDOR = '127.0.0.1' 
PORTA_SERVIDOR = 5000
TIMEOUT = 2.0 

def calcular_checksum(dados):
    return zlib.crc32(dados) & 0xffffffff

def simular_erro(dados, prob_corrupcao):
    if random.random() * 100 < prob_corrupcao:
        dados_corrompidos = bytearray(dados)
        if len(dados_corrompidos) > 0:
            dados_corrompidos[-1] = (dados_corrompidos[-1] + 1) % 255
        return bytes(dados_corrompidos), True
    return dados, False

def enviar_pacote_confiavel(sock, seq, dados, prob_perda, prob_corrupcao):
    """Função auxiliar para enviar qualquer dado com a lógica de erro/retry"""
    ack_recebido = False
    while not ack_recebido:
        checksum_real = calcular_checksum(dados)
        
        # Simulação de Perda
        if random.random() * 100 < prob_perda:
            print(f"--- [SIMULAÇÃO] Pacote {seq} (ou Metadados) PERDIDO.")
        else:
            # Simulação de Corrupção
            dados_a_enviar, corrompido = simular_erro(dados, prob_corrupcao)
            if corrompido:
                print(f"--- [SIMULAÇÃO] Pacote {seq} CORROMPIDO enviado.")
            
            pacote = struct.pack('!II', seq, checksum_real) + dados_a_enviar
            sock.sendto(pacote, (IP_SERVIDOR, PORTA_SERVIDOR))
        
        try:
            ack_pacote, _ = sock.recvfrom(1024)
            ack_seq = struct.unpack('!I', ack_pacote)[0]
            if ack_seq == seq:
                ack_recebido = True
        except socket.timeout:
            print(f"[Timeout] Pacote {seq}. Reenviando...")

def enviar_arquivo():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.settimeout(TIMEOUT)
    
    nome_caminho = input("Digite o nome do arquivo para enviar: ")
    if not os.path.exists(nome_caminho):
        print("Arquivo não encontrado.")
        return

    # Pega apenas o nome (ex: se for C:/Docs/foto.jpg, pega apenas foto.jpg)
    nome_arquivo = os.path.basename(nome_caminho)
    
    tamanho_pacote = int(input("Tamanho do pacote (bytes): "))
    prob_perda = float(input("Probabilidade de perda (0-100): "))
    prob_corrupcao = float(input("Probabilidade de corrupção (0-100): "))

    seq = 0
    
    # --- PASSO 1: Enviar o NOME do arquivo (Pacote 0) ---
    print(f"Enviando metadados do arquivo: {nome_arquivo}...")
    enviar_pacote_confiavel(sock, seq, nome_arquivo.encode('utf-8'), prob_perda, prob_corrupcao)
    print("Metadados confirmados pelo servidor.")
    seq += 1 # Incrementa para começar os dados no 1

    # --- PASSO 2: Enviar o CONTEÚDO do arquivo ---
    with open(nome_caminho, "rb") as f:
        while True:
            dados = f.read(tamanho_pacote)
            if not dados:
                break 
            
            # Usa a mesma função auxiliar para enviar os pedaços
            enviar_pacote_confiavel(sock, seq, dados, prob_perda, prob_corrupcao)
            print(f"Pacote {seq} enviado e confirmado.")
            seq += 1

    # Envia pacote vazio para finalizar
    sock.sendto(struct.pack('!II', seq, 0), (IP_SERVIDOR, PORTA_SERVIDOR))
    print("\nTransferência concluída com sucesso.")
    sock.close()

if __name__ == "__main__":
    enviar_arquivo()