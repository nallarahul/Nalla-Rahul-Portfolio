import React from 'react';

/**
 * MagneticButton — clean interactive button wrapper.
 * Magnetic movement has been removed per user instruction so buttons and nav elements stay firm.
 */
export default function MagneticButton({
  children,
  className = '',
  as: Tag = 'button',
  strength = 0.3,
  ...props
}) {
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}
