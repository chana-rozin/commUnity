// src/components/Forms/CommunitySelect.tsx
import React from 'react';
import { Community } from '@/types/community.type';


interface CommunitySelectProps {
    communities: Community[];
    selectedCommunities: string[];
    onChange: (selected: string[]) => void;
    isLoading?: boolean;
}

export const CommunitySelect: React.FC<CommunitySelectProps> = ({ 
    communities, 
    selectedCommunities, 
    onChange,
    isLoading = false
}) => {
    const handleToggle = (communityId: string) => {
        const updated = selectedCommunities.includes(communityId)
            ? selectedCommunities.filter(id => id !== communityId)
            : [...selectedCommunities, communityId];
        onChange(updated);
    };

    if (isLoading) {
        return <div className="text-gray-600">Loading communities...</div>;
    }

    if (!communities.length) {
        return <div className="text-gray-600">No communities found</div>;
    }

    return (
        <div className="space-y-2 max-h-48 overflow-y-auto">
            {communities.map((community) => (
                <div key={community._id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                    <input
                        type="checkbox"
                        id={`community-${community._id}`}
                        checked={selectedCommunities.includes(community._id || '')}
                        onChange={() => handleToggle(community._id || '')}
                        className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <label 
                        htmlFor={`community-${community._id}`} 
                        className="mr-2 text-sm text-gray-700 cursor-pointer flex-1"
                    >
                        {community.name}
                    </label>
                </div>
            ))}
        </div>
    );
};