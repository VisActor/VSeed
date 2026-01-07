import { useEffect, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';
import { funnel } from 'remeda';
import type { User } from './UserList';

interface CursorAwarenessState {
  user: User;
  cursor?: {
    x: number;
    y: number;
  };
}

export const CursorOverlay = ({
  provider,
}: {
  provider: WebsocketProvider;
}) => {
  const [cursors, setCursors] = useState<CursorAwarenessState[]>([]);

  useEffect(() => {
    const awareness = provider.awareness;

    // Handle mouse move with throttling using remeda's funnel
    const mouseMoveFunnel = funnel<[MouseEvent], MouseEvent>(
      (e: MouseEvent) => {
        const { clientX, clientY } = e;
        // console.log('CursorOverlay: Sending cursor pos', clientX, clientY);
        awareness.setLocalStateField('cursor', {
          x: clientX / window.innerWidth,
          y: clientY / window.innerHeight,
        });
      },
      {
        minGapMs: 50,
        triggerAt: 'both',
        reducer: (_prev, event: MouseEvent) => event,
      },
    );

    const handleMouseMove = (e: MouseEvent) => mouseMoveFunnel.call(e);

    window.addEventListener('mousemove', handleMouseMove);

    // Handle awareness changes
    const updateCursors = () => {
      const states = awareness.getStates();
      const cursorList: CursorAwarenessState[] = [];

      states.forEach((state, clientId) => {
        if (clientId === awareness.clientID) return; // Skip own cursor
        const typedState = state as unknown as CursorAwarenessState;
        if (typedState.user && typedState.cursor) {
          cursorList.push({
            user: typedState.user,
            cursor: typedState.cursor,
          });
        }
      });

      setCursors(cursorList);
    };

    updateCursors();
    awareness.on('change', updateCursors);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      awareness.off('change', updateCursors);
      mouseMoveFunnel.cancel();
    };
  }, [provider]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {cursors.map((state, index) => {
        if (!state.cursor || !state.user) return null;

        const { x, y } = state.cursor;
        const { name, color } = state.user;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${x * 100}%`,
              top: `${y * 100}%`,
              pointerEvents: 'none',
              transition: 'left 0.1s linear, top 0.1s linear',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: 'block',
                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))',
              }}
            >
              <path
                d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                fill={color}
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <div
              style={{
                backgroundColor: color,
                color: 'white',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                marginTop: '4px',
                marginLeft: '12px',
                boxShadow: '0px 2px 2px rgba(0,0,0,0.2)',
              }}
            >
              {name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
