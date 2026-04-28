import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import App from '../App';

// Mocking dependencies
vi.mock('axios');
vi.mock('../services/firebase');

describe('User Flow Integration', () => {
  test('complete user journey: check eligibility then navigate to timeline', async () => {
    render(<App />);
    
    // Initial view is Hero
    expect(screen.getByText(/Empowering Every American Voice/i)).toBeInTheDocument();

    // Navigate to Eligibility
    fireEvent.click(screen.getByRole('button', { name: /Eligibility/i }));
    
    // Check eligibility
    fireEvent.change(screen.getByPlaceholderText(/enter your age/i), { target: { value: '30' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Texas' } });
    
    const yesButton = screen.getAllByRole('button').find(b => b.textContent === 'Yes');
    fireEvent.click(yesButton);
    
    fireEvent.click(screen.getByText(/Check Eligibility/i));
    
    await waitFor(() => {
      expect(screen.getByText(/you are likely eligible/i)).toBeInTheDocument();
    });

    // Navigate to Timeline
    fireEvent.click(screen.getByRole('button', { name: /Election Cycle/i }));
    expect(screen.getByText(/The Election Cycle/i)).toBeInTheDocument();
  });
});
