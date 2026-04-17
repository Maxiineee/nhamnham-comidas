'use server'

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import imgFlour from "@/app/assets/FlourTeste.jpg"
import imgTorta from "@/app/assets/TortaTeste.jpg"

export async function getUserId(): Promise<string | null> {
    const session = await auth.api.getSession(
        { headers: await headers() }
    )
    const userId = session?.user?.id ?? null;
    return userId;
}

export async function getRecipeAuthorId(recipeId: string): Promise<string | null> {
    return "vvE3KO68uRVtAvhsCCrx1JmoB4zJJJUJ"

    /** Test values for now. Integrated with BD right below 
    const authorData = await prisma.recipe.findUnique({
        where: {
            id: recipeId
        },
        select: {
            authorId: true
        }
    })
    const authorId = authorData?.authorId ?? null
    return authorId      */
}

let testImgUrl = imgTorta.src

export type RecipeCardData = {
    id: string;
    imgUrl: string;
    avgRating: number;
    title: string;
    categories: string[];
    liked: boolean;
    saved: boolean;
    author: {
        id: string;
        name: string;
        imgUrl: string;
    };
}

export async function getBest(category?: string): Promise<RecipeCardData[]> {
    const userId = await getUserId();
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    switch (category) {
        case "Breakfast":
            testImgUrl = "https://catracalivre.com.br/wp-content/uploads/2023/12/istock-155388694-1.jpg";
            break;
        case "Lunch":
            testImgUrl = "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/spaghetti_and_meatballs_69603_16x9.jpg";
            break;
        case "Dinner":
            testImgUrl = "https://static01.nyt.com/images/2023/08/31/multimedia/RS-Lasagna-hkjl/RS-Lasagna-hkjl-threeByTwoMediumAt2X.jpg";
            break;
        case "Snacks":
            testImgUrl = "https://storage.googleapis.com/imagens_videos_gou_cooking_prod/production/mesas/2019/11/1acdc8cb-croissant-_-tm-croissant-folhados-brioches-_-claudia-rezende-_-6605-baixa-3.jpg";
            break;
        case "Desserts":
            testImgUrl = "https://static.toiimg.com/thumb/53096885.cms?imgsize=1572013&width=800&height=800";
            break;
        default:
            testImgUrl = imgTorta.src
            break;
    }

    // Test values for now. Integrated with BD below this

    return [{
        id: "1234-abcd-test",
        imgUrl: testImgUrl,
        avgRating: 4.5,
        title: "Test - Lemon Pie",
        liked: true,
        saved: false,
        author: {
            id: "123",
            name: "user_test",
            imgUrl: "https://avatars.githubusercontent.com/u/12345678?v=4"
        },
        categories: ["Dessert", "Snacks"]
    }, {
        id: "1234-abcd-test",
        imgUrl: testImgUrl,
        avgRating: 4.5,
        title: "Test - Lemon Pie",
        liked: true,
        saved: false,
        author: {
            id: "123",
            name: "user_test",
            imgUrl: "https://avatars.githubusercontent.com/u/12345678?v=4"
        },
        categories: ["Dessert", "Snacks"]
    }, {
         id: "1234-abcd-test",
        imgUrl: testImgUrl,
        avgRating: 4.5,
        title: "Test - Lemon Pie",
        liked: true,
        saved: false,
        author: {
            id: "123",
            name: "user_test",
            imgUrl: "https://avatars.githubusercontent.com/u/12345678?v=4"
        },
        categories: ["Dessert", "Snacks"]
    }, {
         id: "1234-abcd-test",
        imgUrl: testImgUrl,
        avgRating: 4.5,
        title: "Test - Lemon Pie",
        liked: true,
        saved: false,
        author: {
            id: "123",
            name: "user_test",
            imgUrl: "https://avatars.githubusercontent.com/u/12345678?v=4"
        },
        categories: ["Dessert", "Snacks"]
    }]

    /**

    const recipesData = await prisma.recipe.findMany({
        where: {
            createdAt: {
                gte: firstDayOfMonth,
            },
            ...(category ? {
                recipe: {
                    categories: {
                        some: {
                            category: {
                                name: category,
                            },
                        },
                    },
                },
            } : {}),
        },
        select: {
            id: true,
            title: true,
            image: true,
            ratingAvg: true,
            categories: {
                select: {
                    category: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            reviews: {
                where: {
                    userId: userId ?? "",
                },
                select: {
                    id: true,
                },
                take: 1,
            },
            inFavorites: {
                where: {
                    userId: userId ?? "",
                },
                select: {
                    id: true,
                },
                take: 1,
            },
        }, orderBy: {
            ratingAvg: "desc",
        }, take: 4
    });

    if (!recipesData) return null

    const finalData = recipesData.map((recipe) => {
        if (!recipe || recipe.ratingAvg === null) {
            return null;
        }

        const isLiked = recipe.reviews[0] ? true : false;
        const isSaved = recipe.inFavorites[0] ? true : false;
        const categories = recipe.categories.slice(0, 3).map((item) => item.category.name);
        const avgRating = Number(recipe.ratingAvg.toFixed(1));

        return {
            id: recipe.id,
            imgUrl: recipe.image,
            avgRating: avgRating,
            title: recipe.title,
            categories: categories,
            liked: isLiked,
            saved: isSaved,
            author: {
                id: recipe.author.id,
                name: recipe.author.name,
                imgUrl: recipe.author.image ?? "",
            },
        };
    })
        .filter((item): item is RecipeCardData => item !== null);

    return finalData;
     */
}

export async function searchRecipesByIngredients(ingredients: string[], page: number = 1): Promise<RecipeCardData[] | null> {
    const userId = await getUserId();
    const recipesData = await prisma.recipe.findMany({
        where: {
            ingredients: {
                some: {
                    ingredient: {
                        name: {
                            in: ingredients,
                        }
                    }
                }
            }
        },
        select: {
            id: true,
            title: true,
            image: true,
            ratingAvg: true,
            categories: {
                select: {
                    category: {
                        select: {
                            name: true,
                        },
                    },
                }, take: 3
            },
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            reviews: {
                where: {
                    userId: userId ?? "",
                },
                select: {
                    id: true,
                },
                take: 1,
            },
            inFavorites: {
                where: {
                    userId: userId ?? "",
                },
                select: {
                    id: true,
                },
                take: 1,
            },
        },
        take: 10,
        skip: (page - 1) * 10,
    })

    if (!recipesData) return null;

    const finalData = recipesData.map(recipe => {
        const isLiked = recipe.reviews[0] ? true : false;
        const isSaved = recipe.inFavorites[0] ? true : false;
        const categories = recipe.categories.map((item) => item.category.name);
        const avgRating = Number((recipe.ratingAvg ?? 0).toFixed(1));
        return {
            id: recipe.id,
            imgUrl: recipe.image,
            avgRating: avgRating,
            title: recipe.title,
            categories: categories,
            liked: isLiked,
            saved: isSaved,
            author: {
                id: recipe.author.id,
                name: recipe.author.name,
                imgUrl: recipe.author.image ?? "",
            }
        }
    })

    return finalData;
}

type RecipeFiltersType = {
    categories?: string[];
    tags?: string[];
    prepTime?: number;
    servings?: number;
    rating?: number;
}

export async function searchRecipes(query: string, page: number = 1, filters?: RecipeFiltersType): Promise<RecipeCardData[] | null> {
    const userId = await getUserId();
    query = query.trim();
    if (query.length === 0) return [];

    const recipesData = await prisma.recipe.findMany({
        where: {
            OR: [{
                title: {
                    search: query,
                },
            }, {
                description: {
                    search: query,
                }
            }, {
                tags: {
                    some: {
                        tag: {
                            name: {
                                contains: query,
                                mode: "insensitive",
                            }
                        }
                    }
                }
            }, {
                ingredients: {
                    some: {
                        ingredient: {
                            name: {
                                contains: query,
                                mode: "insensitive",
                            }
                        }
                    }
                }
            }],
            ...(filters?.categories?.length ? {
                categories: {
                    some: {
                        category: {
                            name: {
                                in: filters.categories,
                            }
                        }
                    }
                }
            } : {}),
            ...(filters?.tags?.length ? {
                tags: {
                    some: {
                        tag: {
                            name: {
                                in: filters.tags
                            }
                        }
                    }
                }
            } : {}),
            ...(filters?.prepTime ? {
                prepTime: {
                    lte: filters.prepTime,
                }
            } : {}),
            ...(filters?.servings ? {
                servings: {
                    gte: filters.servings,
                }
            } : {}),
            ...(filters?.rating ? {
                ratingAvg: {
                    gte: filters.rating,
                }
            } : {})
        },
        orderBy: {
            _relevance: {
                fields: ['title', 'description'],
                search: query,
                sort: 'desc',
            }
        },
        select: {
            id: true,
            title: true,
            image: true,
            ratingAvg: true,
            categories: {
                select: {
                    category: {
                        select: {
                            name: true,
                        },
                    },
                }, take: 3
            },
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            reviews: {
                where: {
                    userId: userId ?? "",
                },
                select: {
                    id: true,
                },
                take: 1,
            },
            inFavorites: {
                where: {
                    userId: userId ?? "",
                },
                select: {
                    id: true,
                },
                take: 1,
            }
        },
        take: 10,
        skip: (page - 1) * 10,
    })

    if (!recipesData) return null;

    const finalData = recipesData.map(recipe => {
        const isLiked = recipe.reviews[0] ? true : false;
        const isSaved = recipe.inFavorites[0] ? true : false;
        const categories = recipe.categories.map((item) => item.category.name);
        const avgRating = Number((recipe.ratingAvg ?? 0).toFixed(1));
        return {
            id: recipe.id,
            imgUrl: recipe.image,
            avgRating: avgRating,
            title: recipe.title,
            categories: categories,
            saved: isSaved,
            liked: isLiked,
            author: {
                id: recipe.author.id,
                name: recipe.author.name,
                imgUrl: recipe.author.image ?? "",
            }
        }
    })

    return finalData;
}

export type RecipeDetailsData = {
    id: string,
    title: string,
    description?: string,
    imgUrl: string,
    prepTime: number,
    servings: number,
    createdAt: Date,
    avgRating: number,
    saved: boolean,
    categories: string[],
    tags: string[],
    liked: boolean,
    author: {
        id: string,
        name: string,
        imgUrl: string
    }
}

export async function getRecipeDetails(id: string): Promise<RecipeDetailsData | null> {
    const userId = await getUserId()

    // Test values for now. Integrad with BD below this
    return {
        id: "1234-abcd-test",
        title: "Test - Lemon Pie",
        description: "A homemade lemon pie that's sure to impress. Made in the oven. A classic recipe passed trough my family generations",
        imgUrl: testImgUrl,
        prepTime: 120,
        servings: 12,
        createdAt: new Date(2026, 1, 14),
        avgRating: 3.7,
        saved: true,
        liked: false,
        author: {
            id: "vvE3KO68uRVtAvhsCCrx1JmoB4zJJJUJ",
            name: "user_test",
            imgUrl: "https://avatars.githubusercontent.com/u/12345678?v=4"
        },
        categories: ["Dessert", "Snacks"],
        tags: ["#Italian", "#Pie", "#Oven"]
    }

    /** 
    const recipeData = await prisma.recipe.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            description: true,
            image: true,
            prepTime: true,
            servings: true,
            createdAt: true,
            ratingAvg: true,
            categories: {
                select: {
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            tags: {
                select: {
                    tag: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            inFavorites: {
                where: {
                    userId: userId ?? "",
                },
                select: {
                    id: true,
                },
                take: 1,
            },
            revies> {
                where: {
                    userId: userId ?? "",
                },
                select: {
                    id: true,
                },
                take: 1,
            },
        }
    })

    if (!recipeData) return null;

    const isLiked = recipeData.revies[0] ? true : false;
    const isSaved = recipeData.inFavorites[0] ? true : false;
    const categories = recipeData.categories.map((item) => item.category.name);
    const tags = recipeData.tags.map((item) => `#${item.tag.name}`);
    const avgRating = Number((recipeData.ratingAvg ?? 0).toFixed(1));

    const finalData = {
        id: recipeData.id,
        title: recipeData.title,
        description: recipeData.description ?? "",
        imgUrl: recipeData.image,
        prepTime: recipeData.prepTime,
        servings: recipeData.servings,
        createdAt: recipeData.createdAt,
        avgRating: avgRating,
        saved: isSaved,
        categories: categories,
        tags: tags,
        liked: isLiked,
        author: {
            id: recipeData.author.id,
            name: recipeData.author.name,
            imgUrl: recipeData.author.image ?? "",
        }
    }

    return finalData;
    */
}

export type RecipeIngredientData = {
    quantity: number,
    unit: string,
    index: number,
    name: string,
    id: string,
}

export async function getRecipeIngredients(id: string): Promise<RecipeIngredientData[]> {

    return [{
        name: "flour",
        id: "123-flour",
        unit: "cups",
        quantity: 2,
        index: 0,
    }, {
        name: "butter",
        id: "123-butter",
        unit: "tablespoons",
        quantity: 4,
        index: 1,
    }, {
        name: "can of table cream",
        id: "123-table-cream",
        unit: "unit",
        quantity: 1,
        index: 2,
    }, {
        name: "baking powder",
        id: "123-baking-powder",
        unit: "teaspoon",
        quantity: 1,
        index: 3,
    }, {
        name: "can of condensed milk",
        id: "123-condensed-milk",
        unit: "unit",
        quantity: 1,
        index: 4,
    }, {
        name: "lemon juice",
        id: "123-lemon-juice",
        unit: "tablespoons",
        quantity: 6,
        index: 5,
    },]



    /**USING TEST DATA FOR NOW. Integration with BD below this
     
    const ingredientsData = await prisma.recipeIngredient.findMany({
        where: {
            recipeId: id
        },
        select: {
            quantity: true,
            unit: true,
            index: true,
            ingredient: {
                select: {
                    name: true,
                    id: true,
                }
            }
        }
    })

    let finalData: RecipeIngredientData[] = []

    ingredientsData.forEach((item) => {
        finalData[item.index] = {
            quantity: item.quantity,
            unit: item.quantity > 1 ? (item.unit+"s") : item.unit,
            index: item.index,
            name: item.ingredient.name,
            id: item.ingredient.id,
        }
    })

    return finalData;    */
}

export type RecipeStepData = {
    id: string,
    description: string,
    imgUrl?: string,
    index: number
}

export async function getRecipeSteps(id: string): Promise<RecipeStepData[]> {
    return [{
        id: "123-step-0",
        description: "In a large bowl, sift the wheat flour to remove lumps. Then make a well in the center of the flour.",
        imgUrl: imgFlour.src,
        index: 0,
    }, {
        id: "123-step-1",
        description: "Add the butter, half a can of table cream and the baking powder to the well. Then mix all the ingredients by hand, until you get a smooth dough that doesn't stick to your hands.",
        index: 1,
    }]

    /** Test data for now. Integration with BD right below 
    const stepsData = await prisma.step.findMany({
        where: {
            recipeId: id
        },
        select: {
            id: true,
            description: true,
            image: true,
            index: true,
        }
    })

    let finalData: RecipeStepData[] = []

    stepsData.forEach((item) => {
        finalData[item.index] = {
            id: item.id,
            description: item.description,
            imgUrl: item.image ?? "",
            index: item.index
        }
    })

    return finalData;   */
}

export type RecipeReviewData = {
    id: string,
    value: number,
    comment?: string,
    createdAt: Date,
    author: {
        id: string,
        name: string,
        imgUrl: string,
    },
    likes: number
    liked: boolean
}

export async function getRecipeReviews(id: string): Promise<RecipeReviewData[] | null> {
    const userId = await getUserId();

    return [{
        id: "review-1",
        value: 4.5,
        comment: "Delicious recipe. Baked it for a friends party and got a lot of compliments. I personally love the dough, it accents the lemon so nicely.",
        createdAt: new Date(2026, 4, 6),
        likes: 18,
        liked: true,
        author: {
            id: "vvE3KO68uRVtAvhsCCrx1JmoB4zJJJUJ",
            name: "Comidinhas da Maxine",
            imgUrl: "https://avatars.githubusercontent.com/u/12345678?v=4"
        }
    }, {
        id: "review-2",
        value: 3.5,
        comment: "The recipe is pretty simple and doesnt take too long. It can be too sweet though, so I would recommend adding more lemon juice to the lemon mousse.",
        createdAt: new Date(2026, 3, 23),
        likes: 12,
        liked: false,
        author: {
            id: "author-123-test",
            name: "Chef Jeny",
            imgUrl: "https://avatars.githubusercontent.com/u/13425678?v=4"
        }
    }, {
        id: "review-3",
        value: 5,
        createdAt: new Date (2026, 2, 18),
        likes: 0,
        liked: false,
        author: {
            id: "author-345-test",
            name: "Lana Cookies",
            imgUrl: "https://avatars.githubusercontent.com/u/18273645?v=4"
        }
    }]

    /** Test data for now. Integrated with BD right below 
    const reviewsData = await prisma.review.findMany({
        where: {
            recipeId: id
        }, select: {
            id: true,
            value: true,
            comment: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            _count: {
                select: {
                    likes: true
                }
            },
            likes: {
                where: {
                    userId: userId ?? undefined
                },
                select: {
                    userId: true
                }
            }
        }
    })

    if (!reviewsData) return null;
    let finalData: RecipeReviewData[] = []

    reviewsData.map((item) => {
        const isLiked = item.likes[0] ? true : false;
        return {
            id: item.id,
            value: item.value,
            comment: item.comment,
            createdAt: item.createdAt,
            author: {
                id: item.user.id,
                name: item.user.name,
                imgUrl: item.user.image,
            },
            likes: item._count.likes,
            liked: isLiked
        }
    })

    return finalData;        */
}

export async function addToShoppingList(ingredients: RecipeIngredientData[]) {
    //todo: add the ingredients to the user's shopping list in the database
    console.log("Adding to shopping list: " + ingredients)
}

export async function likeReview(id: string) {
    //Todo: add like review logic
    console.log("Review liked: " + id)
}

export async function unlikeReview(id: string) {
     //Todo: add unlike review logic
    console.log("Review unliked: " + id)
}

export async function saveRecipe(id: string, folder?: string) {
     //Todo: add save recipe logic
    console.log("Review saved: " + id)
} 

export async function unsaveRecipe(id: string) {
    //Todo: add unsave recipe logic
    console.log("Review unsaved")
}