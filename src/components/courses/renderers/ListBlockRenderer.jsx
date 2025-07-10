import React from 'react';

export const ListBlockRenderer = ({ block }) => {
  return (
    <div className="prose max-w-none">
      {block.style === 'bullet' && (
        <ul className="list-disc list-inside space-y-2">
          {block.content.items.map((item, index) => (
            <li key={index} className="text-gray-700">{item.text}</li>
          ))}
        </ul>
      )}
      {block.style === 'numbered' && (
        <ol className="list-decimal list-inside space-y-2">
          {block.content.items.map((item, index) => (
            <li key={index} className="text-gray-700">{item.text}</li>
          ))}
        </ol>
      )}
      {block.style === 'checklist' && (
        <div className="space-y-2">
          {block.content.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={item.checked || false} 
                readOnly
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span className={`text-gray-700 ${item.checked ? 'line-through text-gray-500' : ''}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListBlockRenderer;