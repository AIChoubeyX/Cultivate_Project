'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useId,
} from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
} from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Disclosure Context
 * - Holds the open/close state and toggle function
 */
const DisclosureContext = createContext(undefined);

/**
 * Provider Component
 * Wraps children and provides state via context
 */
function DisclosureProvider({ children, open, onOpenChange, variants }) {
  const [internalOpenValue, setInternalOpenValue] = useState(open);

  useEffect(() => {
    setInternalOpenValue(open);
  }, [open]);

  const toggle = () => {
    const newOpen = !internalOpenValue;
    setInternalOpenValue(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return (
    <DisclosureContext.Provider
      value={{
        open: internalOpenValue,
        toggle,
        variants,
      }}
    >
      {children}
    </DisclosureContext.Provider>
  );
}

/**
 * Hook to use Disclosure Context
 */
function useDisclosure() {
  const context = useContext(DisclosureContext);
  if (!context) {
    throw new Error('useDisclosure must be used within a DisclosureProvider');
  }
  return context;
}

/**
 * Main Disclosure Component
 * Combines provider, trigger, and content
 */
export function Disclosure({
  open = false,
  onOpenChange,
  children,
  className,
  transition,
  variants,
}) {
  return (
    <MotionConfig transition={transition}>
      <div className={className}>
        <DisclosureProvider
          open={open}
          onOpenChange={onOpenChange}
          variants={variants}
        >
          {React.Children.toArray(children)[0]}
          {React.Children.toArray(children)[1]}
        </DisclosureProvider>
      </div>
    </MotionConfig>
  );
}

/**
 * Disclosure Trigger
 * Toggles open/close state on click or Enter/Space key
 */
export function DisclosureTrigger({ children, className }) {
  const { toggle, open } = useDisclosure();

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child, {
          onClick: toggle,
          role: 'button',
          'aria-expanded': open,
          tabIndex: 0,
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          },
          className: cn(className, child.props.className),
          ...child.props,
        });
      })}
    </>
  );
}

/**
 * Disclosure Content
 * Animated content area that expands/collapses
 */
export function DisclosureContent({ children, className }) {
  const { open, variants } = useDisclosure();
  const uniqueId = useId();

  const BASE_VARIANTS = {
    expanded: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
    collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
  };

  return (
    <div className={cn('overflow-hidden', className)}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={uniqueId}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={combinedVariants}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Export all as default
 */
export default {
  Disclosure,
  DisclosureProvider,
  DisclosureTrigger,
  DisclosureContent,
};
