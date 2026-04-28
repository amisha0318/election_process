import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import EligibilityChecker from '../components/EligibilityChecker';

describe('EligibilityChecker', () => {
  test('shows eligible message for 18+ citizen', async () => {
    render(<EligibilityChecker />);
    
    // Using test-id or better, labels
    fireEvent.change(screen.getByPlaceholderText(/enter your age/i), { target: { value: '25' } });
    
    // Select state
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Texas' } });
    
    // Select citizenship
    const citizenButtons = screen.getAllByRole('button');
    const yesButton = citizenButtons.find(b => b.textContent === 'Yes');
    fireEvent.click(yesButton);
    
    // Click check
    fireEvent.click(screen.getByText(/Check Eligibility/i));
    
    await waitFor(() => {
      expect(screen.getByText(/you are likely eligible/i)).toBeInTheDocument();
    });
  });

  test('shows future eligibility for under 18', async () => {
    render(<EligibilityChecker />);
    fireEvent.change(screen.getByPlaceholderText(/enter your age/i), { target: { value: '16' } });
    fireEvent.click(screen.getByText(/Check Eligibility/i));
    
    await waitFor(() => {
      expect(screen.getByText(/when you turn 18/i)).toBeInTheDocument();
    });
  });
});
