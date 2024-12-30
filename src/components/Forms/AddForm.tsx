import React from "react";
import { useForm, Controller, SubmitHandler, Path } from 'react-hook-form';
import { z, ZodType, ZodObject, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Community } from '@/types/community.type';

// Field Labels in Hebrew
const fieldLabels: Record<string, string> = {
    item: "פריט",
    createdDate: "תאריך יצירה",
    borrower: "מספר מזהה של מבקש",
    LoanDate: "תאריך השאלה",
    active: "פעיל",
    AuthorizedIds: "רשימת מורשים",
    name: "שם",
    description: "תיאור",
    date: "תאריך",
    location: "מיקום",
    expirationDate: "תאריך אחרון לפרסום"
};

interface AddFormProps<T extends ZodType> {
    schema: T;
    onSubmit: (data: Partial<TypeOf<T>>) => void;
    initialValues?: Partial<TypeOf<T>>;
    hiddenFields?: Partial<TypeOf<T>>;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const CommunitySelect = ({ 
    communities, 
    selectedCommunities, 
    onChange 
  }: {
    communities: Community[];
    selectedCommunities: string[];
    onChange: (selected: string[]) => void;
  }) => {
    const handleToggle = (communityId: string) => {
      const updated = selectedCommunities.includes(communityId)
        ? selectedCommunities.filter(id => id !== communityId)
        : [...selectedCommunities, communityId];
      onChange(updated);
    };
  
    return (
      <div className="space-y-2">
        {communities.map((community) => (
          <div key={community._id} className="flex items-center">
            <input
              type="checkbox"
              id={community._id}
              checked={selectedCommunities.includes(community._id || '')}
              onChange={() => handleToggle(community._id || '')}
              className="h-4 w-4 text-indigo-600 rounded border-gray-300"
            />
            <label htmlFor={community._id} className="mr-2 text-sm text-gray-700">
              {community.name}
            </label>
          </div>
        ))}
      </div>
    );
  };

export function AddForm<T extends ZodType>({ schema, onSubmit, initialValues = {}, hiddenFields = {}, title, isOpen, onClose, children,}: AddFormProps<T>) {
    if (!isOpen) return null;

    const { control, handleSubmit, formState: { errors } } = useForm<TypeOf<T>>({
        resolver: zodResolver(schema),
        defaultValues: { ...initialValues, ...hiddenFields } as TypeOf<T>,
    });

    const isZodObject = (schema: ZodType): schema is ZodObject<any> => {
        return (schema as ZodObject<any>).shape !== undefined;
    };

    const schemaFields = isZodObject(schema) ? schema.shape : {};

    const formatDateValue = (value: any): string => {
        if (!value) return '';
        const date = new Date(value);
        if (isNaN(date.getTime())) return '';
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);
    };

    const renderInput = (field: string, fieldType: any) => {
        if (hiddenFields[field as keyof typeof hiddenFields] !== undefined) {
            return null;
        }

        let inputType = "text";
        if (fieldType instanceof z.ZodDate) {
            inputType = "datetime-local";
        }

        return (
            <div className="mb-4" key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {fieldLabels[field] || field}
                </label>
                <Controller
                    name={field as Path<TypeOf<T>>}
                    control={control}
                    render={({ field: controllerField }) => {
                        // Special handling for date fields
                        if (fieldType instanceof z.ZodDate) {
                            return (
                                <input
                                    id={field}
                                    type={inputType}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    value={formatDateValue(controllerField.value)}
                                    onChange={(e) => {
                                        const date = e.target.value ? new Date(e.target.value) : null;
                                        controllerField.onChange(date);
                                    }}
                                />
                            );
                        }

                        // Default handling for non-date fields
                        return (
                            <input
                                id={field}
                                type={inputType}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                {...controllerField}
                            />
                        );
                    }}
                />
                {errors[field as Path<TypeOf<T>>] && (
                    <p className="mt-1 text-sm text-red-600">{errors[field as Path<TypeOf<T>>]?.message as string}</p>
                )}
            </div>
        );
    };

    const onFormSubmit: SubmitHandler<TypeOf<T>> = (data) => {
        // Ensure dates are properly converted to ISO strings before submission
        const processedData = Object.entries(data).reduce((acc, [key, value]) => {
            if (value && typeof value === 'object' && 'getTime' in value) {
                acc[key] = (value as Date).toISOString();
            } else {
                acc[key] = value;
            }
            return acc;
        }, {} as any);

        const cleanData = { ...processedData, ...hiddenFields };
        onSubmit(cleanData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="relative bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    aria-label="Close Popup"
                >
                    ✖
                </button>

                <h2 className="text-xl font-bold text-gray-900">{title}</h2>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 mt-4">
                    {Object.entries(schemaFields).map(([field, fieldType]) =>
                        renderInput(field, fieldType)
                    )}
                     {children}
                    <div>
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                        >
                            הוסף
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}