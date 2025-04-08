import BotIcon from './BotIcon';

export default function BotDialogLayout({ widthClassName, children }: BotDialogLayoutProps) {
  return (
    <div className='w-full flex items-end'>
      <BotIcon />
      <div
        className={`${widthClassName} flex flex-col rounded-2xl rounded-bl-none bg-gray-50 text-gray-900 text-sm overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}
