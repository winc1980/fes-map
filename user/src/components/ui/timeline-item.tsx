"use client";

import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { timelineItem } from "@/types";

export function TimelineItem({
  pabilion,
  title,
  content,
  timestamp,
  photos = [],
  like,
}: timelineItem) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="mb-6 border-none shadow-sm overflow-hidden max-w-xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-3 p-3 pb-2">
        <Avatar className="h-8 w-8 border">
          <AvatarImage
            src={pabilion.avatar || "/placeholder.svg"}
            alt={pabilion.name}
          />
          <AvatarFallback className="text-xs">
            {pabilion.name[0]}
          </AvatarFallback>
        </Avatar>
        {/* <div className="flex flex-col">
          <p className="font-semibold text-sm">{pabilion.name}</p>
          {title && <p className="text-xs text-muted-foreground">{title}</p>}
        </div> */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-full h-8 w-8"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>

      {photos && photos.length > 0 && (
        <div className="relative">
          {photos.length === 1 ? (
            <img
              src={photos[0] || "/placeholder.svg"}
              alt="投稿画像"
              className="w-full aspect-square object-cover"
            />
          ) : (
            <Carousel className="w-full">
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="flex aspect-square items-center justify-center">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`投稿画像 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          )}
        </div>
      )}

      <CardContent className="p-0">
        <div className="flex items-center gap-1 p-3 pb-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9"
            onClick={handleLike}
          >
            <Heart
              className={cn(
                "h-6 w-6 transition-all",
                liked ? "fill-red-500 text-red-500 scale-110" : ""
              )}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
            <Share2 className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 ml-auto"
            onClick={() => setSaved(!saved)}
          >
            <Bookmark className={cn("h-6 w-6", saved ? "fill-current" : "")} />
          </Button>
        </div>

        <div className="px-3 pb-1">
          <p className="font-semibold text-sm">
            {likeCount.toLocaleString()}件のいいね
          </p>
        </div>

        <div className="px-3 ">
          <p className="font-semibold text-md text-black">{title}</p>
        </div>

        {content && (
          <div className="px-3 pb-1">
            <p className="text-sm">
              <span className="font-semibold">{pabilion.name}</span> {content}
            </p>
          </div>
        )}

        {/* {allComments.length > 0 && (
          <div className="px-3 pb-1">
            <Button
              variant="link"
              className="p-0 h-auto text-muted-foreground text-sm"
              onClick={() => setShowComments(!showComments)}
            >
              {showComments ? "コメントを非表示" : `${allComments.length}件のコメントをすべて見る`}
            </Button>

            {showComments && (
              <div className="mt-1 space-y-1">
                {allComments.map((comment, index) => (
                  <div key={index} className="flex items-start gap-1 text-sm">
                    <span className="font-semibold">{comment.user}</span>
                    <span>{comment.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )} */}

        <div className="px-3 pb-3 pt-1">
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(timestamp, { addSuffix: true, locale: ja })}
          </p>
        </div>
      </CardContent>

      {/* <CardFooter className="p-0 border-t">
        <form onSubmit={handleComment} className="flex w-full items-center p-3">
          <Input
            type="text"
            placeholder="コメントを追加..."
            className="border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className={cn("ml-auto font-semibold", newComment.trim() ? "text-blue-500" : "text-blue-300")}
            disabled={!newComment.trim()}
          >
            投稿
          </Button>
        </form>
      </CardFooter> */}
    </Card>
  );
}
