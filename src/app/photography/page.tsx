"use client"

import usePhotoList from "@/hook/usePhotoList";
import { useEffect, useRef } from "react";

// 高性能无限滑动参考了
// https://github.com/JIEJOE-WEB-Tutorial/008-02-infinite-scrolling-canvas/blob/main/infinite%20scrolling%20canvas.html

export default function Photography() {
  const { data: photoList = [], isLoading } = usePhotoList();
  const photoContainerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!photoContainerRef.current) return;

    const canvas = photoContainerRef.current;
    let content = canvas.getContext('2d');

    let imageNumber = photoList.length;
    let maxColumn = 6;
    let maxRow = Math.ceil(imageNumber / maxColumn);

    let imgWidth = 300;
    let imgHeight = 300;

    let imgMargin = 150;

    let totalWidth = maxColumn * (imgWidth + imgMargin) - imgMargin;
    let totalHeight = maxRow * (imgHeight + imgMargin) - imgMargin;

    let imgData: any[] = [];
    let movable = false;
    let clickable = true;

    for (let i = 0; i < imageNumber; i++) {
      let img = new Image();
      img.src = `/api/photos/${photoList[i].path}`;
      img.onload = () => {
        let col = i % maxColumn;
        let row = Math.floor(i / maxColumn);

        let x = col * (imgWidth + imgMargin);
        let y = row * (imgHeight + imgMargin);

        // 裁剪图片，保持比例
        let imgAspect = img.width / img.height;
        let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
        
        if (imgAspect > 1) {
          sWidth = img.height;
          sx = (img.width - sWidth) / 2;
        } else {
          sHeight = img.width;
          sy = (img.height - sHeight) / 2;
        }

        imgData.push({ img, x, y, i });
        content!.drawImage(
          img,
          sx, sy, sWidth, sHeight,
          x, y, imgWidth, imgHeight
        );
      };
    }

    let resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // 重新生成所有图片
      if (imgData.length > 0) {
        move(0, 0);
      }
    }

    let move = (x: number, y: number) => {
      content!.clearRect(0, 0, canvas.width, canvas.height);
      imgData.forEach((img) => {
        img.x += x;
        if (img.x > (totalWidth - imgWidth))
          img.x -= totalWidth + imgMargin;
        if (img.x < -imgWidth)
          img.x += totalWidth + imgMargin;
        img.y += y;
        if (img.y > (totalHeight - imgHeight))
          img.y -= totalHeight + imgMargin;
        if (img.y < -imgHeight)
          img.y += totalHeight + imgMargin;

        let imgAspect = img.img.width / img.img.height;
        let sx = 0, sy = 0, sWidth = img.img.width, sHeight = img.img.height;

        if (imgAspect > 1) {
          sWidth = img.img.height;
          sx = (img.img.width - sWidth) / 2;
        } else {
          sHeight = img.img.width;
          sy = (img.img.height - sHeight) / 2;
        }
        content!.drawImage(img.img, sx, sy, sWidth, sHeight, img.x, img.y, imgWidth, imgHeight);
      });
    }

    function showImageFullscreen(img: any) {
      const viewer = document.createElement('div');
      viewer.style.position = 'fixed';
      viewer.style.top = '0';
      viewer.style.left = '0';
      viewer.style.width = '100vw';
      viewer.style.height = '100vh';
      viewer.style.background = 'rgba(0,0,0,0.65)';
      viewer.style.display = 'flex';
      viewer.style.alignItems = 'center';
      viewer.style.justifyContent = 'center';
      viewer.style.flexDirection = 'column';
      viewer.style.gap = '10px';
      viewer.style.zIndex = '9999';

      const imgEl = document.createElement('img');
      imgEl.src = img.img.src;
      imgEl.style.maxWidth = '90%';
      imgEl.style.maxHeight = '70%';
      viewer.appendChild(imgEl);

      const title = document.createElement('h2');
      title.style.maxWidth = '40%';
      title.style.color = 'white';
      title.style.fontSize = '20px';
      title.style.fontWeight = 'bold';
      title.textContent = photoList[img.i].title;
      viewer.appendChild(title);

      const description = document.createElement('div');
      description.style.textIndent = '2em';
      description.style.maxWidth = '40%';
      description.style.color = 'white';
      description.style.fontSize = '16px';
      description.style.fontWeight = 'normal';
      description.textContent = photoList[img.i].description;
      viewer.appendChild(description);

      const date = document.createElement('span');
      date.style.color = 'var(--theme-color)';
      date.style.fontSize = '14px';
      date.style.fontWeight = 'normal';
      date.textContent = new Date(photoList[img.i].createdAt).toLocaleDateString();
      date.style.marginTop = '10px';
      viewer.appendChild(date);

      document.body.appendChild(viewer);

      viewer.addEventListener('click', () => document.body.removeChild(viewer));
    }


    let findImg = (x: number, y: number) => {
      // 遍历所有图片，找出鼠标xy坐标处于图片内部的那张图片
        let img = imgData.find(img =>
          x >= img.x && x < img.x + imgWidth &&
          y >= img.y && y < img.y + imgHeight
        );

        if (img) showImageFullscreen(img);
    }

    let mouseDown = (e: MouseEvent) => {
      movable = true;
    }

    let mouseUp = (e: MouseEvent) => {
      movable = false;
      if (clickable) findImg(e.x, e.y);
    }

    let mouseLeave = () => {
      movable = false;
    }

    function debounce(delay: number) {
      let timer: any = null;

      return function () {
        clearTimeout(timer); // 清除上一个定时器
        timer = setTimeout(() => {
          clickable = true;
        }, delay);
      };
    }

    let debounceFindImg = debounce(100);

    let mouseMove = (e: MouseEvent) => {
      if (e.movementX !== 0 || e.movementY !== 0) {
        clickable = false;
        debounceFindImg();
      }
      if (movable) {
        move(e.movementX, e.movementY);
      }
    }

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('mouseleave', mouseLeave);
    canvas.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', mouseDown);
      canvas.removeEventListener('mouseup', mouseUp);
      canvas.removeEventListener('mouseleave', mouseLeave);
      canvas.removeEventListener('mousemove', mouseMove);
    }
  }, [photoList]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative flex justify-center items-center w-full h-[100vh] overflow-hidden">
      <canvas className="absolute w-full h-full cursor-pointer" ref={photoContainerRef}></canvas>
    </div>
  )
}