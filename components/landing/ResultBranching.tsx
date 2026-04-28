import type { ResultBranch } from "@/lib/industries";

interface ResultBranchingProps {
    branch: ResultBranch;
}

export function ResultBranching({ branch }: ResultBranchingProps) {
    const gradeColor =
        branch.grade === "A" || branch.grade === "MNP_FAMILY"
            ? "bg-emerald-100 text-emerald-800"
            : branch.grade === "B" || branch.grade === "NEW_CHANGE"
            ? "bg-amber-100 text-amber-800"
            : "bg-gray-100 text-gray-700";

    return (
        <section className="py-12 md:py-20 bg-[var(--secondary)]">
            <div className="ot-container max-w-2xl">
                <div className="bg-white p-8 md:p-12 rounded-md border border-gray-200 shadow-lg text-center">
                    <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 ${gradeColor}`}>
                        결과: {branch.grade}
                    </div>
                    <h2 className="font-serif text-2xl md:text-4xl text-[var(--navy)] font-bold mb-4 leading-[1.3]">
                        {branch.title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                        {branch.description}
                    </p>
                    <a
                        href="#contact"
                        className="inline-block bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--navy)] font-bold px-8 py-4 rounded text-base transition-colors"
                    >
                        {branch.cta}
                    </a>
                </div>
            </div>
        </section>
    );
}
