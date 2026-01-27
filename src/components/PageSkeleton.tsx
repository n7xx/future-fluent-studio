import { motion } from "framer-motion";

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Hero Skeleton */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            className="h-8 w-32 bg-muted rounded-full mb-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="h-12 w-3/4 max-w-lg bg-muted rounded-lg mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
          <motion.div
            className="h-6 w-1/2 max-w-md bg-muted rounded-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="glass-card p-6 rounded-2xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            >
              {/* Icon placeholder */}
              <div className="w-14 h-14 bg-muted rounded-xl mb-4" />
              {/* Title placeholder */}
              <div className="h-6 w-3/4 bg-muted rounded-lg mb-3" />
              {/* Description placeholders */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
                <div className="h-4 w-4/6 bg-muted rounded" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
