"use client";
import React, { useEffect, useState } from 'react';
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Truck, RotateCcw, ChevronDown } from 'lucide-react';
import { useParams } from 'next/navigation';
import Navbar from '@/shared/Navbar';
import Footer from '@/shared/Footer';
import ShopNow from '@/app/shopNow/shopNow';


interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    images: string[];
    description: string;
    rating: number;
    is_new: boolean;
}

interface ProductVariation {
    id: string;
    color_name: string;
    color_code: string;
    variation_images: string[];
    main_image: string;
    stock_quantity: number;
    is_available: boolean;
    size_availability: {
        size: string;
        stock: number;
        price_adjustment?: number;
    }[];
    size: string;
    stock: number;
    price_adjustment?: number;
    product_id: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

interface ProductData {
    _id: string;
    product_name: string;
    product_image: string;
    product_data: {
        price: number;
        description: string;
        rating: number;
        is_new: boolean;
        brand: string;
        category: string;
        model_number: string;
    };
    product_sub_images: {
        _id: string;
        color_name: string;
        color_code: string;
        variation_images: string[];
        main_image: string;
        size_availability: {
            size: string;
            stock: number;
            price_adjustment?: number;
        }[];
    }[];
    available_sizes: string[];
}

const ProductPage = () => {
    const { id } = useParams();

    const [productData, setProductData] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVariation, setSelectedVariation] = useState<any>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        sizeAndFit: false,
        deliveryAndReturns: false,
        reviews: false,
        productInformation: false,
        features: false
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://next-cart-api.vercel.app/get/product/${id}`);

                if (!response.ok) {
                    throw new Error('Product not found');
                }

                const data = await response.json();
                setProductData(data);

                // Set initial selected variation
                if (data.product_sub_images && data.product_sub_images.length > 0) {
                    setSelectedVariation(data.product_sub_images[0]);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setError(error instanceof Error ? error.message : 'Failed to load product');
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleVariationChange = (variation: any) => {
        setSelectedVariation(variation);
        setSelectedSize(null);
        setCurrentImageIndex(0);
    };

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getCurrentImages = () => {
        return selectedVariation ? selectedVariation.variation_images : (productData ? [productData.product_image] : []);
    };

    const nextImage = () => {
        const images = getCurrentImages();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        const images = getCurrentImages();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const getCurrentPrice = () => {
        if (!productData) return 0;

        if (selectedSize && selectedVariation) {
            const sizeInfo = selectedVariation.size_availability.find((s: any) => s.size === selectedSize);
            if (sizeInfo && sizeInfo.price_adjustment) {
                return productData.product_data.price + sizeInfo.price_adjustment;
            }
        }
        return productData.product_data.price;
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 md:px-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 border-b-2 border-black mx-auto"></div>
                    <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">Loading product...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !productData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 md:px-8">
                <div className="text-center">
                    <p className="text-red-600 text-base sm:text-lg mb-3 sm:mb-4">{error || 'Product not found'}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-gray-800 transition-colors text-sm sm:text-base"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const currentImages = getCurrentImages();

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                {/* Sale Banner - Enhanced Responsive */}
                <div className="flex flex-col py-2 sm:py-3 md:py-4 justify-center items-center z-50 text-black bg-[#f5f5f5] px-2 sm:px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col justify-center items-center text-center max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                        <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-tight sm:leading-normal">
                            New Styles On Sale: Up To 40% Off
                        </h1>
                        <p className="underline text-xs sm:text-sm md:text-base font-medium mt-1 sm:mt-0">
                            <span>Shop All Our New Markdowns</span>
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16">
                        {/* Left Side - Images with Sticky Behavior */}
                        <div className="lg:sticky lg:top-4 xl:top-8 lg:self-start">
                            <div className="flex gap-2 sm:flex-row sm:gap-4 md:flex-row md:gap-6">
                                {/* Thumbnail Column - Enhanced Responsive */}
                                <div className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-3 sm:order-2 md:flex-col md:space-x-0 md:space-y-3 md:order-1 w-12 sm:w-auto md:w-20">
                                    {currentImages.slice(0, 10).map((image: string, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            onMouseEnter={() => setCurrentImageIndex(index)}
                                            className={`aspect-square rounded-md sm:rounded-lg w-12 sm:w-16 md:w-20 overflow-hidden border-2 transition-all ${index === currentImageIndex
                                                ? 'border-black'
                                                : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${productData.product_name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Main Image - Enhanced Responsive */}
                                <div className="flex-1 sm:order-1 sm:mt-4 sm:flex-row md:order-2">
                                    <div className="relative aspect-square w-full max-w-none sm:max-w-[600px] md:max-w-[700px] lg:max-w-[640px] bg-gray-50 rounded-md sm:rounded-lg md:rounded-xl overflow-hidden group">
                                        <img
                                            src={currentImages[currentImageIndex]}
                                            alt={productData.product_name}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Highly Rated Badge - Enhanced Responsive */}
                                        {productData.product_data.rating >= 4 && (
                                            <div className="absolute top-2 sm:top-4 md:top-5 left-2 sm:left-4 md:left-5 bg-white rounded-full px-2 py-1 sm:px-4 sm:py-2 shadow-md flex items-center space-x-1">
                                                <Star className="w-3 h-3 sm:w-5 sm:h-5 fill-black" />
                                                <span className="text-xs sm:text-base text-black font-medium">Highly Rated</span>
                                            </div>
                                        )}

                                        {/* New Badge - Enhanced Responsive */}
                                        {productData.product_data.is_new && (
                                            <div className="absolute top-2 sm:top-4 md:top-5 right-2 sm:right-4 md:right-5 bg-green-500 text-white rounded-full px-2 py-1 sm:px-4 sm:py-2 shadow-md">
                                                <span className="text-xs sm:text-base font-medium">New</span>
                                            </div>
                                        )}

                                        {/* Navigation Arrows - Enhanced Responsive */}
                                        {currentImages.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-2 sm:left-4 md:left-4 bottom-2 sm:bottom-4 md:bottom-4 w-8 h-8 sm:w-12 sm:h-12 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                                                >
                                                    <ChevronLeft className="w-4 sm:w-6 text-black h-4 sm:h-6" />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-2 sm:right-4 md:right-4 bottom-2 sm:bottom-4 md:bottom-4 w-8 h-8 sm:w-12 sm:h-12 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                                                >
                                                    <ChevronRight className="w-4 sm:w-6 text-black h-4 sm:h-6" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Product Details - Enhanced Responsive */}
                        <div className="space-y-4 sm:space-y-5 md:space-y-6 min-h-screen">
                            {/* Product Title and Category - Enhanced Responsive */}
                            <div>
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-1 sm:mb-2 leading-tight">
                                    {productData.product_name}
                                </h1>
                                <p className="text-gray-600 text-sm sm:text-base">{productData.product_data.category}</p>
                                {productData.product_data.brand && (
                                    <p className="text-gray-500 text-xs sm:text-sm">{productData.product_data.brand}</p>
                                )}
                            </div>

                            {/* Rating - Enhanced Responsive */}
                            {productData.product_data.rating > 0 && (
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < productData.product_data.rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                    <span className="text-xs sm:text-sm text-gray-600 ml-1 sm:ml-2">
                                        ({productData.product_data.rating}/5)
                                    </span>
                                </div>
                            )}

                            {/* Price - Enhanced Responsive */}
                            <div>
                                <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-black">
                                    MRP : ₹ {getCurrentPrice().toLocaleString()}.00
                                </div>
                                <p className="text-gray-600 text-xs sm:text-sm mt-1">Inclusive of all taxes</p>
                                <p className="text-gray-600 text-xs sm:text-sm">(Also includes all applicable duties)</p>
                            </div>

                            {/* Color Variations - Enhanced Responsive */}
                            {productData.product_sub_images && productData.product_sub_images.length > 0 && (
                                <div className="space-y-3 sm:space-y-4">
                                    <h3 className="text-base sm:text-lg md:text-xl text-black font-semibold">
                                        Color: {selectedVariation?.color_name}
                                    </h3>
                                    <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2">
                                        {productData.product_sub_images.map((variation) => (
                                            <button
                                                key={variation._id}
                                                onClick={() => handleVariationChange(variation)}
                                                onMouseEnter={() => handleVariationChange(variation)}
                                                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${selectedVariation?._id === variation._id
                                                    ? 'border-black'
                                                    : 'border-gray-200 hover:border-gray-400'
                                                    }`}
                                                title={variation.color_name}
                                            >
                                                <img
                                                    src={variation.main_image}
                                                    alt={variation.color_name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selection - Enhanced Responsive */}
                            {productData.available_sizes && productData.available_sizes.length > 0 && (
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base sm:text-lg md:text-xl text-black font-semibold">Select Size</h3>
                                        <button className="flex items-center space-x-1 text-gray-600 hover:text-black">
                                            <div className="w-3 h-3 sm:w-4 sm:h-4 border border-current rounded"></div>
                                            <span className="text-xs sm:text-sm">Size Guide</span>
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                        {productData.available_sizes.map((size) => {
                                            const isAvailable = !selectedVariation ||
                                                selectedVariation.size_availability.length === 0 ||
                                                selectedVariation.size_availability.some((s: any) => s.size === size && s.stock > 0);

                                            return (
                                                <button
                                                    key={size}
                                                    onClick={() => isAvailable && setSelectedSize(size)}
                                                    disabled={!isAvailable}
                                                    className={`p-2 sm:p-3 border rounded-md sm:rounded-lg text-center transition-all ${selectedSize === size
                                                        ? 'border-black bg-black text-white'
                                                        : isAvailable
                                                            ? 'border-gray-300 hover:border-gray-500 bg-white text-black'
                                                            : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                >
                                                    <div className="font-medium text-xs sm:text-sm">{size}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Add to Bag Button - Enhanced Responsive */}
                            <div className="space-y-2 sm:space-y-3">
                                <button
                                    disabled={productData.available_sizes?.length > 0 && !selectedSize}
                                    className="w-full bg-black text-white py-3 sm:py-4 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                                >
                                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>
                                        {productData.available_sizes?.length > 0 && !selectedSize
                                            ? 'Select Size'
                                            : 'Add to Bag'
                                        }
                                    </span>
                                </button>

                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className="w-full border border-black text-black py-3 sm:py-4 rounded-full font-medium hover:bg-black hover:text-white transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                                >
                                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                    <span>Favourite</span>
                                </button>
                            </div>

                            {/* Product Description - Enhanced Responsive */}
                            <div className="border-t pt-4 sm:pt-5 md:pt-6">
                                <button
                                    onClick={() => window.open('#', '_blank')}
                                    className="text-black underline hover:no-underline transition-all text-sm sm:text-base"
                                >
                                    View Product Details
                                </button>
                                <div className="mt-3 sm:mt-4">
                                    <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
                                        {productData.product_data.description}
                                    </p>
                                    {productData.product_data.brand && (
                                        <div className="mt-3 sm:mt-4 space-y-1 text-xs sm:text-sm">
                                            <p className="text-gray-700">
                                                <span className="font-medium">Style:</span> {productData.product_data.model_number || 'N/A'}
                                            </p>
                                            <p className="text-gray-700">
                                                <span className="font-medium">Country/Region of Origin:</span> {productData.product_data.brand}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Features that perform section - Enhanced Responsive */}
                            <div className="border-t pt-4 sm:pt-5 md:pt-6">
                                <div className="mb-4 sm:mb-5 md:mb-6">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4">Features that perform</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                                        {/* Lighter upper */}
                                        <div className="bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black mb-1 sm:mb-2">Lighter upper</h3>
                                            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                                                Engineered mesh helps reduce the weight of the shoe, while providing a more consistent fit.
                                                And we saved more weight by reducing the size of the heel and tongue.
                                            </p>
                                        </div>

                                        {/* Lighter foam */}
                                        <div className="bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black mb-1 sm:mb-2">Lighter foam</h3>
                                            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                                                Nike ZoomX, our most responsive foam, just got lighter. Running from heel to toe,
                                                it unlocks even more energy return than before with a slight midsole reduction,
                                                giving you a bouncy, feathery feel.
                                            </p>
                                        </div>

                                        {/* Lighter outsole */}
                                        <div className="bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black mb-1 sm:mb-2">Lighter outsole</h3>
                                            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                                                We reduced the weight of the outsole by using a thinner rubber compared to the Vaporfly 3.
                                            </p>
                                        </div>

                                        {/* Full carbon plate */}
                                        <div className="bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black mb-1 sm:mb-2">Full carbon plate</h3>
                                            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                                                The full-length carbon-fibre plate provides a propulsive feel and
                                                unlocks more leverage from the foot and ankle for maximum energy return.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tech specs section - Enhanced Responsive */}
                            <div className="border-t pt-4 sm:pt-5 md:pt-6">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4">Tech specs</h2>

                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black mb-1 sm:mb-2">What's new?</h3>
                                        <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                                            <li>
                                                Nike's most resilient foam just got a little better. The midsole design saves weight
                                                and unlocks even more energy return by reducing foam where it isn't needed.
                                            </li>
                                            <li>
                                                The lab-tested and runner-validated, curved, full-length carbon-fibre Flyplate
                                                delivers a propulsive feel and unlocks more leverage from the foot and ankle.
                                            </li>
                                            <li>
                                                The blown rubber outside delivers a dynamic combination of traction, durability
                                                and cushioning. The softer material compresses to conform to the road for
                                                elevated traction and a smooth transition.
                                            </li>
                                            <li>
                                                The engineered mesh upper increases comfort and fit consistency, while contributing
                                                to the overall weight savings of the shoe.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <h4 className="font-medium text-black text-sm sm:text-base">Engineered for</h4>
                                            <p className="text-gray-700 text-xs sm:text-sm md:text-base">Road racing</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-black text-sm sm:text-base">Race distance</h4>
                                            <p className="text-gray-700 text-xs sm:text-sm md:text-base">10K, half-marathons and marathons</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-black text-sm sm:text-base">Shoe weight</h4>
                                            <p className="text-gray-700 text-xs sm:text-sm md:text-base">Approx. 152g (women's size 5.5)</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-black text-sm sm:text-base">Heel-to-toe drop</h4>
                                            <p className="text-gray-700 text-xs sm:text-sm md:text-base">6mm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Collapsible Sections - Enhanced Responsive */}
                            <div className="space-y-3 sm:space-y-4">
                                {/* Size & Fit */}
                                <div className="border-b border-gray-200">
                                    <button
                                        onClick={() => toggleSection('sizeAndFit')}
                                        className="w-full flex items-center justify-between py-3 sm:py-4 text-left"
                                    >
                                        <span className="text-base sm:text-lg md:text-xl font-medium text-black">Size & Fit</span>
                                        <ChevronDown
                                            className={`w-4 h-4 sm:w-5 sm:h-5 text-black transition-transform ${expandedSections.sizeAndFit ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {expandedSections.sizeAndFit && (
                                        <div className="pb-3 sm:pb-4 text-xs sm:text-sm md:text-base text-gray-700 space-y-1 sm:space-y-2">
                                            <p>True to size - order your normal size</p>
                                            <p>Regular fit through body and hips</p>
                                            <p>Model is 6'2" and wearing size Medium</p>
                                        </div>
                                    )}
                                </div>

                                {/* Delivery & Returns */}
                                <div className="border-b border-gray-200">
                                    <button
                                        onClick={() => toggleSection('deliveryAndReturns')}
                                        className="w-full flex items-center justify-between py-4 text-left"
                                    >
                                        <span className="text-lg font-medium text-black">Delivery & Returns</span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-black transition-transform ${expandedSections.deliveryAndReturns ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {expandedSections.deliveryAndReturns && (
                                        <div className="pb-4 space-y-4 text-sm">
                                            <div className="flex items-start space-x-3">
                                                <Truck className="w-5 h-5 mt-0.5 text-gray-600" />
                                                <div>
                                                    <p className="font-medium text-black">Free Delivery</p>
                                                    <p className="text-gray-600">Free standard delivery on orders over ₹1,500</p>
                                                    <p className="text-gray-600">Express delivery available for ₹200</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <RotateCcw className="w-5 h-5 mt-0.5 text-gray-600" />
                                                <div>
                                                    <p className="font-medium text-black">Return Policy</p>
                                                    <p className="text-gray-600">Free 30-day returns</p>
                                                    <p className="text-gray-600">Items must be in original condition</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Reviews */}
                                <div className="border-b border-gray-200">
                                    <button
                                        onClick={() => toggleSection('reviews')}
                                        className="w-full flex items-center justify-between py-4 text-left"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg font-medium text-black">Reviews (9)</span>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-4 h-4 fill-black text-black"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <ChevronDown
                                            className={`w-5 h-5 text-black transition-transform ${expandedSections.reviews ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {expandedSections.reviews && (
                                        <div className="pb-4 space-y-4 text-sm">
                                            <div className="border rounded-lg p-4">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 fill-black text-black" />
                                                        ))}
                                                    </div>
                                                    <span className="font-medium">Amazing quality!</span>
                                                </div>
                                                <p className="text-gray-700">Perfect fit and great comfort. Highly recommended!</p>
                                                <p className="text-gray-500 text-xs mt-2">Verified Purchase - 2 weeks ago</p>
                                            </div>
                                            <div className="border rounded-lg p-4">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div className="flex">
                                                        {[...Array(4)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 fill-black text-black" />
                                                        ))}
                                                        <Star className="w-4 h-4 text-gray-300" />
                                                    </div>
                                                    <span className="font-medium">Good value</span>
                                                </div>
                                                <p className="text-gray-700">Nice product, fast delivery. Would buy again.</p>
                                                <p className="text-gray-500 text-xs mt-2">Verified Purchase - 1 month ago</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Product Information */}
                                <div className="border-b border-gray-200">
                                    <button
                                        onClick={() => toggleSection('productInformation')}
                                        className="w-full flex items-center justify-between py-4 text-left"
                                    >
                                        <span className="text-lg font-medium text-black">Product Information</span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-black transition-transform ${expandedSections.productInformation ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {expandedSections.productInformation && (
                                        <div className="pb-4 space-y-3 text-sm">
                                            <div className="space-y-2">
                                                <h4 className="font-medium text-black">Features & Benefits</h4>
                                                <div className="space-y-1 text-gray-700">
                                                    <p>• High-quality materials for lasting durability</p>
                                                    <p>• Designed for comfort and style</p>
                                                    <p>• Breathable fabric technology</p>
                                                    <p>• Easy care and maintenance</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="font-medium text-black">Care Instructions</h4>
                                                <div className="space-y-1 text-gray-700">
                                                    <p>• Machine wash cold with like colors</p>
                                                    <p>• Do not bleach</p>
                                                    <p>• Tumble dry low</p>
                                                    <p>• Iron on low heat if needed</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="font-medium text-black">Materials</h4>
                                                <p className="text-gray-700">100% Premium Cotton</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShopNow />
            <Footer />
        </>
    );
};

export default ProductPage;