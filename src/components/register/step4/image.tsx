import React from 'react';
import { ImageProps } from './types';

export const ImageComponent: React.FC<ImageProps> = ({ src, className, alt }) => (
    <img
        loading="lazy"
        src={src}
        className={className}
        alt={alt}
    />
);