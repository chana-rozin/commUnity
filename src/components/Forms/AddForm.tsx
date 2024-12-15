import React from "react";
import { useForm, Controller, SubmitHandler, Path } from 'react-hook-form';
import { z, ZodType, ZodObject, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Field Labels in Hebrew
const fieldLabels: Record<string, string> = {
    item: "פריט",
    createdDate: "תאריך יצירה",
    borrowerId: "מספר מזהה של מבקש",
    LoanDate: "תאריך השאלה",
    active: "פעיל",
    AuthorizedIds: "רשימת מורשים",
};

interface AddFormProps<T extends ZodType> {
    schema: T;
    onSubmit: (data: Partial<TypeOf<T>>) => void;
    initialValues?: Partial<TypeOf<T>>;
    hiddenFields?: Partial<TypeOf<T>>;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export function AddForm<T extends ZodType>({ schema, onSubmit, initialValues = {}, hiddenFields = {}, title, isOpen, onClose,}: AddFormProps<T>) {
    if (!isOpen) return null;

    const { control, handleSubmit, formState: { errors } } = useForm<TypeOf<T>>({
        resolver: zodResolver(schema),
        defaultValues: { ...initialValues, ...hiddenFields } as TypeOf<T>,
    });

    const isZodObject = (schema: ZodType): schema is ZodObject<any> => {
        return (schema as ZodObject<any>).shape !== undefined;
    };

    const schemaFields = isZodObject(schema) ? schema.shape : {};

    const renderInput = (field: string, fieldType: any) => {
        if (hiddenFields[field as keyof typeof hiddenFields] !== undefined) {
            return null;
        }

        let inputType = "text";
        if (fieldType instanceof z.ZodDate) inputType = "date";

        return (
            <div className="mb-4" key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {fieldLabels[field] || field}
                </label>
                <Controller
                    name={field as Path<TypeOf<T>>} // Explicitly cast to Path<TypeOf<T>>
                    control={control}
                    render={({ field: controllerField }) => (
                        <input
                            id={field}
                            type={inputType}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            {...controllerField}
                        />
                    )}
                />
                {errors[field as Path<TypeOf<T>>] && (
                    <p className="mt-1 text-sm text-red-600">{errors[field as Path<TypeOf<T>>]?.message as string}</p>
                )}
            </div>
        );
    };


    const onFormSubmit: SubmitHandler<TypeOf<T>> = (data) => {
        const cleanData = { ...data, ...hiddenFields };
        onSubmit(cleanData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    aria-label="Close Popup"
                >
                    ✖
                </button>

                {/* Popup Title */}
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>

                {/* Form Content */}
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 mt-4">
                    {Object.entries(schemaFields).map(([field, fieldType]) =>
                        renderInput(field, fieldType)
                    )}
                    <div>
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                        >
                            שלח
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
