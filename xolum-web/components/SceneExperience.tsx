'use client';

import { Component, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { ScenePoster } from './ScenePoster';
import { useDeviceCapabilities } from '@/lib/capabilities';

const Core = dynamic(() => import('./XolumHeroScene'), { ssr: false, loading: () => <ScenePoster variant="core" /> });
const Radar = dynamic(() => import('./xolsec/XolsecHeroScene'), { ssr: false, loading: () => <ScenePoster variant="radar" /> });
class SceneBoundary extends Component<{ children: ReactNode; variant: 'core' | 'radar' }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <ScenePoster variant={this.props.variant} /> : this.props.children; }
}
const workflows = [
  { name: 'Almacén', input: 'Consulta por WhatsApp', output: 'Existencias actualizadas' },
  { name: 'Facturación', input: 'Datos de la venta', output: 'Factura y respuesta al cliente' },
  { name: 'Citas', input: 'Solicitud de horario', output: 'Reserva confirmada' },
];
export function SceneExperience({ variant }: { variant: 'core' | 'radar' }) {
  const { heavy3D } = useDeviceCapabilities();
  const [paused, setPaused] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [workflow, setWorkflow] = useState(0);
  return <div>
    <div className="relative aspect-square w-full">
      <SceneBoundary key={generation} variant={variant}>
        {heavy3D ? variant === 'core' ? <Core paused={paused} workflow={workflow} /> : <Radar paused={paused} /> : <ScenePoster variant={variant} />}
      </SceneBoundary>
    </div>
    <div className="scene-controls" aria-label="Controles de la demostración">
      {variant === 'core' && workflows.map((item, index) => <button key={item.name} aria-pressed={workflow === index} onClick={() => setWorkflow(index)}>{item.name}</button>)}
      {heavy3D && <>
        <button aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Reanudar' : 'Pausar'}</button>
        <button onClick={() => { setGeneration(generation + 1); setPaused(false); }}>Repetir</button>
      </>}
    </div>
    <p className="scene-caption" aria-live="polite">{variant === 'core' ? `${workflows[workflow].input} → IA y automatización → ${workflows[workflow].output}.` : 'Ensamblaje → vigilancia → detección y aviso. Una demostración del funcionamiento de XOLSEC.'}</p>
    <p className="mt-1 text-xs text-[var(--text-muted)]">Demostración ilustrativa. No muestra datos de clientes.</p>
  </div>;
}
