import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import babysittingSchema from "../../schemas/zod/babysittingSchema";
import Select from "react-select";
import { CommunityInUser } from "@/types/general.type";
import { Babysitting } from "@/types/babysitting.type";
import useUserStore from "@/stores/userStore";
import { useCreateBabysittingRequest } from "@/services/mutations/babysitting";
import SearchableSelectWithAPI from "@/components/map/map"
import { Address } from '@/types/general.type'

// Type inference from Zod schema
const formSchema = babysittingSchema.omit({ requester: true }); // requester will be hidden

type BabysittingRequest = z.infer<typeof formSchema>;

type Path<T> = T extends object
    ? { [K in keyof T]: K extends string ? `${K}` | `${K}.${Path<T[K]>}` : never }[keyof T]
    : "";

type BabysittingRequestPath = Path<BabysittingRequest>;

const AddBabysittingRequest: React.FC<{ onClose: () => void, isOpen: boolean; }> = ({
    onClose,
    isOpen,
}) => {
    if (!isOpen) return null;

    const { user } = useUserStore();
    const createRequestMutation = useCreateBabysittingRequest();
    
    const onSubmit = (newRequest: Partial<Babysitting>) => {
        console.log("onSubmit", JSON.stringify(newRequest));
        createRequestMutation.mutate({
            ...newRequest,
            requester: {
                _id: user!._id!,
                first_name: user!.first_name,
                last_name: user!.last_name,
            },
            babysitter: undefined,
        });
        onClose();
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<BabysittingRequest>({
        resolver: zodResolver(formSchema),
    });

    const renderInput = (
        name: BabysittingRequestPath, // Updated to use Path utility
        label: string,
        type: string = "text"
    ) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Controller
                name={name as any} // Explicitly cast for nested paths
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        id={name}
                        type={type}
                        value={field.value || ''}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    />
                )}
            />
            {errors[name as keyof BabysittingRequest] && (
                <p className="mt-1 text-sm text-red-600">
                    {errors[name as keyof BabysittingRequest]?.message}
                </p>
            )}
        </div>
    );


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="relative bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    aria-label="Close Popup"
                >
                    ✖
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-4">הוספת בקשת בייביסיטר</h2>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(
                        (data) => {
                            console.log("Validation succeeded", data);
                            onSubmit(data);
                        },
                        (errors) => {
                            console.log("Validation failed", errors);
                        }
                    )}
                    className="space-y-6"
                >
                    <section className="flex justify-between gap-4">
                        {renderInput("date", "תאריך", "date")}

                        <div className="grid grid-cols-2 gap-4">
                            {renderInput("time.start", "שעת התחלה", "time")}
                            {renderInput("time.end", "שעת סיום", "time")}
                        </div>
                    </section>

                    <section className="flex justify-between gap-4">
                        {renderInput("address.neighborhood", "שכונה")}
                        {renderInput("address.street", "רחוב")}
                        {renderInput("address.city", "עיר")}
                        {renderInput("address.houseNumber", "מספר בית")}
                    </section>

                    <section className="flex justify-between gap-4">
                        {renderInput("childrenNumber", "מספר ילדים", "number")}
                        {renderInput("ageRange", "טווח גילאים")}
                    </section>

                    <div className="mb-4">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            הערות
                        </label>
                        <Controller
                            name="notes"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    id="notes"
                                    rows={3}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                />
                            )}
                        />
                        {errors.notes && (
                            <p className="mt-1 text-sm text-red-600">{errors.notes?.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="AuthorizedIds" className="block text-sm font-medium text-gray-700">
                            מורשים
                        </label>
                        <Controller
                            name="AuthorizedIds"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    id="AuthorizedIds"
                                    isMulti
                                    options={user?.communities.map((community) => ({
                                        value: community._id,
                                        label: community.name,
                                    }))}
                                    classNamePrefix="react-select"
                                    placeholder="קהילות לפרסום"
                                    onChange={(selected: any) => {
                                        field.onChange(selected.map((s: any) => s.value));
                                    }}
                                    value={field.value
                                        ? field.value.map((id: string) => {
                                            // Find the community object for each selected `id`
                                            const selectedCommunity = user?.communities.find(
                                                (community) => community._id === id
                                            );
                                            // Ensure that `selectedCommunity` is correctly structured
                                            return selectedCommunity
                                                ? { value: selectedCommunity._id, label: selectedCommunity.name }
                                                : null;
                                        }).filter(Boolean) // Remove null values if any
                                        : []
                                    }
                                />
                            )}
                        />
                        {errors.AuthorizedIds && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.AuthorizedIds?.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                    >
                        שלח בקשה
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBabysittingRequest;
