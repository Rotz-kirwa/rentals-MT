interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  let bg = '#f1f5f9';
  let color = '#475569';

  switch (status.toUpperCase()) {
    case 'OCCUPIED':
    case 'PAID':
    case 'ACTIVE':
    case 'COMPLETED':
      bg = '#dcfce7';
      color = '#166534';
      break;
    case 'VACANT':
    case 'PENDING':
    case 'DRAFT':
      bg = '#fef9c3';
      color = '#854d0e';
      break;
    case 'MAINTENANCE':
    case 'UNPAID':
    case 'OVERDUE':
    case 'TERMINATED':
      bg = '#fee2e2';
      color = '#991b1b';
      break;
    case 'PARTIAL':
    case 'IN_PROGRESS':
      bg = '#e0f2fe';
      color = '#0369a1';
      break;
  }

  return (
    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: bg, color }}>
      {status}
    </span>
  );
}
