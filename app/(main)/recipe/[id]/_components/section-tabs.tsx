'use client'
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type tabsProps = {
    recipeId: string,
    tabIngredients: React.ReactNode, tabSteps: React.ReactNode, tabReviews: React.ReactNode
}

export default function SectionTabs({ tabIngredients, tabSteps, tabReviews }: tabsProps) {
    const [currentTab, setCurrentTab] = useState("ingredients")
    return (
        <Tabs className="mx-3 sm:mx-0" value={currentTab} onValueChange={(value) => setCurrentTab(value)}>
            <TabsList className="w-full" >
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients" className="flex flex-col gap-2" keepMounted>
                {tabIngredients}
                <Button className="mx-2" onClick={() => setCurrentTab("steps")}>Start cooking!</Button>
            </TabsContent>
            <TabsContent value="steps" keepMounted>
                {tabSteps}
            </TabsContent>
            <TabsContent value="reviews" keepMounted>
                {tabReviews}
            </TabsContent>
        </Tabs>
    )
}