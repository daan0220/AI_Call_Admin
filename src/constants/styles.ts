export const COLORS = {
  primary: '#5B7FFF',
  text: '#222',
  border: '#D6E2FF',
  background: '#F6F9FF',
  white: '#FFFFFF',
} as const;

export const CARD_STYLES = {
  container: 'rounded-xl shadow-md bg-white p-6 flex flex-col items-center',
  border: `1px solid ${COLORS.border}`,
  icon: 'h-6 w-6',
  title: 'text-lg font-semibold',
  value: 'text-2xl font-bold',
} as const;

export const LAYOUT_STYLES = {
  container: 'container mx-auto py-8',
  pageTitle: 'mb-8 text-2xl font-bold',
  grid: {
    base: 'grid gap-6',
    responsive: 'md:grid-cols-2 lg:grid-cols-4',
  },
} as const;

export const TABLE_STYLES = {
  container: 'w-full border-collapse',
  header: 'bg-gray-50 text-left text-sm font-medium text-gray-500',
  cell: 'px-6 py-4 text-sm text-gray-900',
  row: 'border-b border-gray-200 hover:bg-gray-50',
} as const; 