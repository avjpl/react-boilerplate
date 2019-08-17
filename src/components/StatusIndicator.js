import React from 'react';

import styles from './StatusIndicator.css';

const StatusIndicator = ({ status = "CLOSED", onChange }) => (
  <>
    <span
      className={status === 'OPEN' ? styles.open : styles['openHollow']}
      onClick={() => onChange("OPEN")}
    ></span>

    <span
      className={status === 'HOLD' ? styles.hold : styles['holdHollow']}
      onClick={() => onChange("HOLD")}
    ></span>

    <span
      className={status === 'CLOSED' ? styles.closed : styles['closedHollow']}
      onClick={() => onChange("CLOSED")}
    ></span>
  </>
);

export default StatusIndicator;
