import Link from "next/link";
import React from "react";
import { allCoolStuffs } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

export const revalidate = 60;

export default function CoolStuffPage() {
	const items = allCoolStuffs
		.filter((item) => item.published && item.url)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						Cool Stuff
					</h2>
					<p className="mt-4 text-zinc-400">
						Interesting papers, articles, and resources worth checking out.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />
				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
					{items.map((item) => (
						<Card key={item.slug}>
							<Link href={item.url!} target="_blank" rel="noopener noreferrer">
								<article className="relative w-full h-full p-4 md:p-8">
									<div className="text-xs text-zinc-100 mb-2">
										{item.date ? (
											<time dateTime={new Date(item.date).toISOString()}>
												{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
													new Date(item.date),
												)}
											</time>
										) : (
											<span>SOON</span>
										)}
									</div>
									<h2 className="text-2xl font-bold text-zinc-100 group-hover:text-white sm:text-3xl font-display">
										{item.title}
									</h2>
									<p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
										{item.description}
									</p>
									<div className="absolute bottom-4 md:bottom-8">
										<p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
											Read more <span aria-hidden="true">&rarr;</span>
										</p>
									</div>
								</article>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
