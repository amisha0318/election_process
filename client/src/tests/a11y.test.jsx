import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import ChatBot from '../components/ChatBot';
import EligibilityChecker from '../components/EligibilityChecker';
import Timeline from '../components/Timeline';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  test('Chat interface has no accessibility violations', async () => {
    const { container } = render(<ChatBot />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Eligibility Checker has no accessibility violations', async () => {
    const { container } = render(<EligibilityChecker />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Timeline has no accessibility violations', async () => {
    const { container } = render(<Timeline />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
