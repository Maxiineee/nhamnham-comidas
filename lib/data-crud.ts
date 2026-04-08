'use server'

import prisma from "@/lib/prisma";
import { CardReceitaData } from "@/components/card-receita";

export async function getDestaques(category?: string): Promise<CardReceitaData[]> {
    const dataAtual = new Date();
    const primeiroDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);

    let testImgUrl = "https://www.sabornamesa.com.br/media/k2/items/cache/bf1e20a4462b71e3cc4cece2a8c96ac8_XL.jpg"

    switch (category) {
        case "Café da manhã":
            testImgUrl = "https://catracalivre.com.br/wp-content/uploads/2023/12/istock-155388694-1.jpg";
            break;
        case "Almoço":
            testImgUrl = "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/spaghetti_and_meatballs_69603_16x9.jpg";
            break;
        case "Jantar":
            testImgUrl = "https://static01.nyt.com/images/2023/08/31/multimedia/RS-Lasagna-hkjl/RS-Lasagna-hkjl-threeByTwoMediumAt2X.jpg";
            break;
        case "Lanche":
            testImgUrl = "https://storage.googleapis.com/imagens_videos_gou_cooking_prod/production/mesas/2019/11/1acdc8cb-croissant-_-tm-croissant-folhados-brioches-_-claudia-rezende-_-6605-baixa-3.jpg";
            break;
        case "Sobremesas":
            testImgUrl = "https://static.toiimg.com/thumb/53096885.cms?imgsize=1572013&width=800&height=800";
            break;
    }

    console.log("Fetch categoria: " + category)

    // Valores de teste por enquanto, integração com BD logo abaixo, só falta fazer seed no BD

    return [{
        id: "1234-abcd-teste",
        imgUrl: testImgUrl,
        media: 4.5,
        titulo: "Teste - Pizza de Calabresa",
        avaliado: true,
        salvo: false,
        author: {
            id: "123",
            name: "usuario_teste",
            imgUrl: "https://avatars.githubusercontent.com/u/12345678?v=4"
        },
        categorias: ["Almoço", "Jantar", "Lanche"]
    }, {
        id: "5678-efgh-teste",
        imgUrl: testImgUrl,
        media: 2.0,
        titulo: "Teste - Bolo de Chocolate",
        avaliado: false,
        salvo: true,
        author: {
            id: "456",
            name: "outro_usuario",
            imgUrl: "https://avatars.githubusercontent.com/u/87654321?v=4"
        },
        categorias: ["Sobremesas"]
    }, {
        id: "9012-ijkl-teste",
        imgUrl: testImgUrl,
        media: 3.8,
        titulo: "Teste - Salada Caesar",
        avaliado: true,
        salvo: true,
        author: {
            id: "789",
            name: "terceiro_usuario",
            imgUrl: "https://avatars.githubusercontent.com/u/11223344?v=4"
        },
        categorias: ["Almoço", "Lanche"]
    }, {
        id: "3456-mnop-teste",
        imgUrl: testImgUrl,
        media: 4.2,
        titulo: "Teste - Panqueca de Banana",
        avaliado: false,
        salvo: false,
        author: {
            id: "321",
            name: "quarto_usuario",
            imgUrl: "https://avatars.githubusercontent.com/u/44332211?v=4"
        },
        categorias: ["Café da manhã", "Sobremesas"]
    }]

    const dataRecipes = await prisma.recipe.findMany({
        where: {
            createdAt: {
                gte: primeiroDiaDoMes,
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

    const finalData = dataRecipes.map((recipe) => {
        if (!recipe || recipe.ratingAvg === null) {
            return null;
        }

        const isLiked = recipe.reviews[0] ? true : false;
        const isSaved = recipe.inFavorites[0] ? true : false;
        const categories = recipe.categories.slice(0, 3).map((item) => item.category.name);
        const media = Number(recipe.ratingAvg.toFixed(1));

        return {
            id: recipe.id,
            imgUrl: recipe.image,
            media: media,
            titulo: recipe.title,
            categorias: categories,
            avaliado: isLiked,
            salvo: isSaved,
            author: {
                id: recipe.author.id,
                name: recipe.author.name,
                imgUrl: recipe.author.image ?? "",
            },
        };
    })
        .filter((item): item is CardReceitaData => item !== null);

    return finalData;
}

export async function searchRecipesByIngredients(ingredients: string[], page: number = 1): Promise<CardReceitaData[]> {
    const recipes = await prisma.recipe.findMany({
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

    const finalData = recipes.map(recipe => {
        const isLiked = recipe.reviews[0] ? true : false;
        const isSaved = recipe.inFavorites[0] ? true : false;
        const categories = recipe.categories.map((item) => item.category.name);
        const media = Number((recipe.ratingAvg ?? 0).toFixed(1));
        return {
            id: recipe.id,
            imgUrl: recipe.image,
            media: media,
            titulo: recipe.title,
            categorias: categories,
            avaliado: isLiked,
            salvo: isSaved,
            author: {
                id: recipe.author.id,
                name: recipe.author.name,
                imgUrl: recipe.author.image ?? "",
            }
        }
    })

    return finalData;
}

type recipeFiltersType = {
    categories?: string[];
    tags?: string[];
    prepTime?: number;
    servings?: number;
    rating?: number;
}

export async function searchRecipes(query: string, page: number = 1, filters?: recipeFiltersType): Promise<CardReceitaData[]> {
    query = query.trim();
    if (query.length === 0) return [];
    
    const recipes = await prisma.recipe.findMany({
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
        }, select: {
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

    const finalData = recipes.map(recipe => {
        const isLiked = recipe.reviews[0] ? true : false;
        const isSaved = recipe.inFavorites[0] ? true : false;
        const categories = recipe.categories.map((item) => item.category.name);
        const media = Number((recipe.ratingAvg ?? 0).toFixed(1));
        return {
            id: recipe.id,
            imgUrl: recipe.image,
            media: media,
            titulo: recipe.title,
            categorias: categories,
            avaliado: isLiked,
            salvo: isSaved,
            author: {
                id: recipe.author.id,
                name: recipe.author.name,
                imgUrl: recipe.author.image ?? "",
            }
        }
    })

    return finalData;
}