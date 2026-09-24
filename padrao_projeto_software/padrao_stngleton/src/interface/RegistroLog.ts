export type NivelLog = 'INFO' | 'WARN' | 'ERROR';

export default interface RegistroLog {
    timestamp: Date;
    nivel: NivelLog;
    mensagem: string;
}