import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
   


    useEffect(() => {
        if (post) {
            setValue("title", post.title || "");
            setValue("slug", post.$id || "");
            setValue("content", post.content || "");
            setValue("status", post.status || "active");
        }
    }, [post, setValue]);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title" && value.title) {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        setIsLoading(true); // Show loading overlay

        if (!userData?.$id) {
            alert("User is not logged in. Please log in first.");
            setIsLoading(false);
            return;
        }

        try {
            let file = null;
            if (data.image?.length > 0) {
                file = await appwriteService.uploadFile(data.image[0]);
            }

            const featuredImageId = file ? file.$id : post?.featuredimage || "";

            if (!featuredImageId) {
                alert("Please upload a valid image.");
                setIsLoading(false);
                return;
            }

            const dbPost = await appwriteService.createPost({
                ...data,
                userID: userData.$id,
                featuredimage: featuredImageId,
            });

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false); // Hide loading overlay
        }
    };

    const onError = (errors) => {
        console.error("Form Errors:", errors);
        alert("Check console for validation errors.");
    };

    return (
        <div className="relative">
            {/* Blurred Form when Loading */}
            <form 
                onSubmit={handleSubmit(submit, onError)} 
                className={`flex flex-wrap transition-all ${isLoading ? "blur-sm pointer-events-none" : ""}`} 
                noValidate
            >
                <div className="w-2/3 px-2">
                    <Input label="Title :" placeholder="Title" className="mb-4" {...register("title", { required: "Title is required" })} />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                    <Input label="Slug :" placeholder="Slug" className="mb-4" {...register("slug", { required: "Slug is required" })} />
                    {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>

                <div className="w-1/3 px-2">
                    <Input 
                        label="Featured Image :" 
                        type="file" 
                        className="mb-4" 
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {errors.image && <p className="text-red-500">Image is required</p>}

                    {post?.featuredimage && (
                        <div className="w-full mb-4">
                            {post.featuredimage ? (
                                <img src={appwriteService.getFilePreview(post.featuredimage)} alt={post.title} className="rounded-lg" />
                            ) : (
                                <p className="text-gray-500">No image available</p>
                            )}
                        </div>
                    )}

                    <Select options={["active", "inactive"]} label="Status" className="mb-4" {...register("status", { required: "Status is required" })} />
                    {errors.status && <p className="text-red-500">{errors.status.message}</p>}

                    <Button type="submit" className="w-full bg-green-500">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
                    <div className="flex flex-col items-center">
                        <span className="loading loading-spinner loading-lg text-white"></span>
                        <p className="text-white text-lg mt-2">Submitting...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
