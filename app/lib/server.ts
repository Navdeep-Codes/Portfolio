"use server";

import { client } from "@/sanity/lib/client";
import { unstable_noStore as noStore } from "next/cache";

export async function getResearchs() {
  noStore();
  try {
    const data = await client.fetch(`*[_type == "research"]`);
    data.sort(
      (a: { _createdAt: string }, b: { _createdAt: string }) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getResearchFromSlug(slug: string) {
  noStore();
  try {
    const data = await client.fetch(
      `*[_type == "research" && slug.current == $slug][0]`,
      { slug }
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAdjacentResearch(slug: string) {
  noStore();
  try {
    const allResearch = await client.fetch(`*[_type == "research"] | order(_createdAt desc)`);
    const currentIndex = allResearch.findIndex((r: any) => r.slug.current === slug);
    
    if (currentIndex === -1) return { prev: null, next: null };
    
    const prev = currentIndex > 0 ? allResearch[currentIndex - 1] : null;
    const next = currentIndex < allResearch.length - 1 ? allResearch[currentIndex + 1] : null;
    
    return { prev, next };
  }
  catch (error) {
    console.error(error);
    return { prev: null, next: null };
  }
}

export async function getWorks() {
  noStore();
  try {
    const data = await client.fetch(`*[_type == "work"]`);
    data.sort(
      (a: { _createdAt: string }, b: { _createdAt: string }) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getPastEvents() {
  noStore();
  try {
    const data = await client.fetch(`*[_type == "past"]`);
    data.sort(
      (a: { _createdAt: string }, b: { _createdAt: string }) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
