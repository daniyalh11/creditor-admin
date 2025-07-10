import React from 'react';

export const TextBlockRenderer = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
      return (
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{block.content.paragraph}</p>
        </div>
      );

    case 'heading-paragraph':
      return (
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{block.content.heading}</h2>
          <p className="text-gray-700 leading-relaxed">{block.content.paragraph}</p>
        </div>
      );

    case 'subheading-paragraph':
      return (
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{block.content.subheading}</h3>
          <p className="text-gray-700 leading-relaxed">{block.content.paragraph}</p>
        </div>
      );

    case 'table':
      return (
        <div className="prose max-w-none">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {block.content.tableData?.headers.map((header, index) => (
                    <th key={index} className="px-4 py-2 border border-gray-300 text-left font-semibold text-gray-900">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.content.tableData?.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2 border border-gray-300 text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default TextBlockRenderer;