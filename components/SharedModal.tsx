import {
  ArrowUturnLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CldImage } from "next-cloudinary";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "../utils/animationVariants";
import { range } from "../utils/range";
import type { ImageProps, SharedModalProps } from "../utils/types";
export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation,
  currentPhoto,
  direction,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  let filteredImages = images?.filter((img: ImageProps) =>
    range(index - 15, index + 15).includes(img.id)
  );
  const DIRECTORY_NAME = "deanna-simpson";

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  let currentImage = images ? images[index] : currentPhoto;
  let aspectRatio = Number(currentImage.width) / Number(currentImage.height);
  let imageLabel = currentImage.public_id.slice(DIRECTORY_NAME.length + 1, -7);
  console.log(
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_180/${currentImage.public_id}`
  );
  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className='relative z-50 flex aspect-[3/2] h-full w-full max-w-7xl items-center wide:h-full'
        {...handlers}
      >
        {/* close modal */}
        <div className='absolute right-4 top-3 z-50 flex items-center gap-2 p-3 text-white'>
          <button
            onClick={() => closeModal()}
            className='rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white'
          >
            {navigation ? (
              <XMarkIcon className='h-5 w-5' />
            ) : (
              <ArrowUturnLeftIcon className='h-5 w-5' />
            )}
          </button>
        </div>
        {/* image label */}
        <div className='font-sm absolute left-5 top-4   z-50 bg-black px-2 py-1 text-white'>
          <p className='text-sm md:text-base '> {imageLabel}</p>
        </div>
        {/* Main image */}
        <div className='h-97 w-full placeholder:overflow-hidden'>
          <div className='relative flex aspect-[2/1] items-center justify-center pb-24'>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial='enter'
                animate='center'
                exit='exit'
                className='absolute'
              >
                <Image
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_749/${currentImage.public_id}.${currentImage.format}`}
                  width={aspectRatio > 1 ? 749 : 499}
                  height={aspectRatio > 1 ? 499 : 749}
                  priority
                  alt={imageLabel}
                  onLoadingComplete={() => setLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className='absolute inset-0 mx-auto flex max-w-7xl items-center justify-center'>
          {/* Buttons */}
          {loaded && (
            <div className='relative aspect-[3/2] max-h-full w-full'>
              {navigation && (
                <>
                  {index > 0 && (
                    <button
                      className='absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none'
                      style={{ transform: "translate3d(0, 0, 0)" }}
                      onClick={() => changePhotoId(index - 1)}
                    >
                      <ChevronLeftIcon className='h-6 w-6' />
                    </button>
                  )}
                  {index + 1 < images.length && (
                    <button
                      className='absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none'
                      style={{ transform: "translate3d(0, 0, 0)" }}
                      onClick={() => changePhotoId(index + 1)}
                    >
                      <ChevronRightIcon className='h-6 w-6' />
                    </button>
                  )}
                </>
              )}
            </div>
          )}
          {/* Bottom Nav bar */}
          {navigation && (
            <div className='fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60'>
              <motion.div
                initial={false}
                className='mx-auto mb-6 mt-6 flex aspect-[3/2] h-14'
              >
                <AnimatePresence initial={false}>
                  {filteredImages.map(({ public_id, format, id }) => (
                    <motion.button
                      initial={{
                        width: "0%",
                        x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                      }}
                      animate={{
                        scale: id === index ? 1.25 : 1,
                        width: "100%",
                        x: `${Math.max(index * -100, 15 * -100)}%`,
                      }}
                      exit={{ width: "0%" }}
                      onClick={() => changePhotoId(id)}
                      key={id}
                      className={`${
                        id === index
                          ? "z-20 rounded-lg shadow shadow-black/50"
                          : "z-10"
                      } ${id === 0 ? "rounded-l-lg" : ""} ${
                        id === images.length - 1 ? "rounded-r-lg" : ""
                      } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                    >
                      <CldImage
                        alt='small photos on the bottom'
                        width={180}
                        height={120}
                        crop='thumb'
                        gravity='faces'
                        border='5px_solid_black'
                        className={`${
                          id === index
                            ? "brightness-110 hover:brightness-110"
                            : "brightness-50 contrast-125 hover:brightness-75"
                        } h-full transform object-cover transition`}
                        src={public_id}
                      />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
