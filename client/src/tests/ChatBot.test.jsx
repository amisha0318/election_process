import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import ChatBot from '../components/ChatBot';

// Mock axios
vi.mock('axios');

describe('ChatBot', () => {
  test('renders chat button initially', () => {
    render(<ChatBot />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('opens chat window when clicked', () => {
    render(<ChatBot />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Election Assistant/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ask a question/i)).toBeInTheDocument();
  });

  test('displays suggested questions on load', () => {
    render(<ChatBot />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/how do i register to vote/i)).toBeInTheDocument();
  });
});
