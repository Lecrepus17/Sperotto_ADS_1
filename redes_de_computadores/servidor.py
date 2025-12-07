import socket
import struct
import zlib

# Configurações
IP = '0.0.0.0'
PORTA = 5000
BUFFER_SIZE = 20000 # Aumentamos para 20KB para evitar corte de pacotes grandes

def calcular_checksum(dados):
    return zlib.crc32(dados) & 0xffffffff

def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((IP, PORTA))
    
    print(f"--- Servidor Blindado ouvindo na porta {PORTA} ---")
    
    arquivo_saida = None
    esperado_seq = 0
    
    while True:
        try:
            # Recebe o pacote com um buffer bem maior
            pacote_completo, addr = sock.recvfrom(BUFFER_SIZE)
            
            # Se receber pacote muito pequeno (menor que cabeçalho), ignora
            if len(pacote_completo) < 8:
                continue

            header = pacote_completo[:8]
            dados = pacote_completo[8:]
            seq_recebido, checksum_recebido = struct.unpack('!II', header)
            
            # Verifica integridade
            checksum_calculado = calcular_checksum(dados)
            if checksum_calculado != checksum_recebido:
                print(f"[!] Pacote {seq_recebido} corrompido (Checksum inválido). Ignorando.")
                continue 
            
            # Verifica duplicidade (reenvia ACK se for pacote antigo)
            if seq_recebido < esperado_seq:
                sock.sendto(struct.pack('!I', seq_recebido), addr)
                continue
                
            # Pacote correto e na ordem
            if seq_recebido == esperado_seq:
                
                # Tratamento do Pacote 0 (Nome do Arquivo)
                if seq_recebido == 0:
                    try:
                        nome_arquivo = dados.decode('utf-8')
                        nome_final = "recebido_" + nome_arquivo 
                        print(f"[+] Recebendo arquivo: {nome_final}")
                        arquivo_saida = open(nome_final, "wb")
                    except Exception as e:
                        print(f"Erro ao criar arquivo: {e}")
                        # Se não der pra criar o arquivo, reseta tudo
                        esperado_seq = 0
                        continue
                else:
                    # Tratamento de Conteúdo (Pacote > 0)
                    if not dados:
                        # Pacote vazio indica FIM
                        print(f"--- Fim da transmissão. Arquivo salvo: {nome_final} ---")
                        if arquivo_saida: 
                            arquivo_saida.close()
                        arquivo_saida = None
                        esperado_seq = 0 
                        
                        # Envia ACK final e volta a ouvir novos arquivos
                        sock.sendto(struct.pack('!I', seq_recebido), addr)
                        continue
                    
                    # Grava no arquivo
                    if arquivo_saida:
                        arquivo_saida.write(dados)
                        arquivo_saida.flush() # Força a gravação no disco imediatamente
                    print(f"[+] Pacote {seq_recebido} gravado com sucesso.")
                
                # Envia ACK
                sock.sendto(struct.pack('!I', esperado_seq), addr)
                esperado_seq += 1
                
        except Exception as e:
            # CORREÇÃO PRINCIPAL: Não damos 'break'. Apenas mostramos o erro e continuamos ouvindo.
            print(f"Erro de processamento (servidor continua vivo): {e}")
            # Não fecha o servidor, permite tentar receber o pacote novamente
            continue
            
    sock.close()

if __name__ == "__main__":
    main()