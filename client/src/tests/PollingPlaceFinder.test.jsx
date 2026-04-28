import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import PollingFinder from '../components/PollingFinder';

vi.mock('axios');

describe('PollingPlaceFinder', () => {
  test('validates address input', () => {
    render(<PollingFinder />);
    const input = screen.getByLabelText(/enter your residential address/i);
    expect(input).toBeInTheDocument();
  });

  test('displays loading state during search', async () => {
    render(<PollingFinder />);
    const input = screen.getByLabelText(/enter your residential address/i);
    fireEvent.change(input, { target: { value: '1600 Pennsylvania Ave' } });
    fireEvent.click(screen.getByRole('button', { name: /find/i }));
    
    expect(screen.getByRole('button', { name: /find/i })).toBeDisabled();
  });
});
