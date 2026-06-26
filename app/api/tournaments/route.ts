import { NextResponse } from 'next/server';
import fs from 'fs'; //модуль Node.js для работы с файлами
import path from 'path'; //правильно собрать путь к файлу

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'result.json');
  // process.cwd() — корень проекта
  // итого: /твой_проект/data/tournaments.json
  const raw = fs.readFileSync(filePath, 'utf-8');// читает файл как текст
  return NextResponse.json(JSON.parse(raw));// превращает текст в JSON и отправляет в браузер
}
