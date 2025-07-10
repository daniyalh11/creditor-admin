import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { CheckCircle, RotateCcw, Trophy, Star } from 'lucide-react';

/**
 * @typedef {object} ScenarioResponse
 * @property {string} id
 * @property {string} text
 * @property {string} [avatarReaction]
 * @property {string} [nextContentId]
 */

/**
 * @typedef {object} ScenarioContent
 * @property {string} id
 * @property {string} heading
 * @property {string} avatarExpression
 * @property {'text-block' | 'dialog-bubble'} [contentType]
 * @property {ScenarioResponse[]} responses
 */

/**
 * @typedef {object} ScenarioScene
 * @property {string} id
 * @property {string} [backgroundImage]
 * @property {string} [characterImage]
 * @property {string} heading
 * @property {ScenarioContent[]} [contents]
 */

/**
 * A component to display an interactive, branching scenario.
 *
 * @param {object} props
 * @param {object} props.content
 * @param {ScenarioScene[]} [props.content.scenes]
 * @param {number} [props.content.currentSceneIndex]
 * @param {number} [props.content.currentContentIndex]
 */
export const ScenarioComponent = ({ content }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(content.currentSceneIndex || 0);
  const [currentContentIndex, setCurrentContentIndex] = useState(content.currentContentIndex || 0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Default content if none is provided
  const defaultScene = {
    id: '1',
    heading: 'Add text to explain the situation your scenario will address.',
    backgroundImage: '/lovable-uploads/a639cc57-1a53-4752-85af-b586193d4582.png',
    characterImage: '/lovable-uploads/3dfe0883-8aec-47eb-b199-f69148c0d059.png',
    contents: [
      {
        id: '1-content-1',
        heading: 'Add text to explain the situation your scenario will address.',
        avatarExpression: 'happy',
        contentType: 'dialog-bubble',
        responses: [{ id: '1', text: 'Continue', avatarReaction: 'happy' }]
      }
    ]
  };

  const currentScene = content.scenes?.[currentSceneIndex] || defaultScene;
  const currentContent = currentScene.contents?.[currentContentIndex] || currentScene.contents?.[0] || defaultScene.contents[0];
  
  const handleContinue = () => {
    const isLastScene = currentSceneIndex === (content.scenes?.length || 1) - 1;
    const isLastContent = currentContentIndex === (currentScene.contents?.length || 1) - 1;
    
    if (isLastScene && isLastContent) {
      setIsCompleted(true);
      return;
    }

    if (currentScene.contents && currentContentIndex < currentScene.contents.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
    } else if (content.scenes && currentSceneIndex < content.scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
      setCurrentContentIndex(0);
    }
  };

  const handleRestart = () => {
    setCurrentSceneIndex(0);
    setCurrentContentIndex(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-16 w-16 h-16 bg-blue-400 rounded-full blur-lg"></div>
          <div className="absolute bottom-16 left-20 w-12 h-12 bg-purple-400 rounded-full blur-lg"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300 rounded-full blur-xl"></div>
        </div>
        
        <div className="absolute inset-0 pointer-events-none">
          <Star className="absolute top-8 left-1/4 w-6 h-6 text-yellow-400 animate-pulse" />
          <Trophy className="absolute top-12 right-1/3 w-5 h-5 text-orange-400 animate-bounce" />
          <Star className="absolute bottom-20 left-1/3 w-4 h-4 text-pink-400 animate-pulse" style={{animationDelay: '0.5s'}} />
          <Star className="absolute bottom-16 right-1/4 w-5 h-5 text-blue-400 animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        <div className="text-center z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 max-w-md mx-4">
          <div className="relative">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4 animate-scale-in" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            🎉 Scenario Completed!
          </h2>
          
          <p className="text-gray-600 mb-6 text-lg">
            Congratulations! You have successfully completed the scenario.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleRestart} 
              variant="outline"
              className="border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart Scenario
            </Button>
            
            <div className="text-sm text-gray-500 mt-2">
              Want to try again? Click restart to begin from the beginning.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalScenes = content.scenes?.length || 1;

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg bg-white">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 bg-cover bg-center"
        style={{ 
          backgroundImage: currentScene.backgroundImage ? `url(${currentScene.backgroundImage})` : undefined 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      
      {currentScene.characterImage && (
        <div className="absolute left-8 bottom-0 w-32 h-80 z-10">
          <img 
            src={currentScene.characterImage} 
            alt="Character"
            className="w-full h-full object-contain object-bottom"
          />
        </div>
      )}
      
      <div className="absolute left-44 top-8 right-8 bottom-8 flex flex-col">
        {currentContent.contentType === 'dialog-bubble' ? (
          <>
            <div className="bg-white rounded-lg p-4 shadow-lg mb-4 relative flex-1 max-w-md">
              <div className="absolute left-0 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white transform -translate-x-2"></div>
              <div className="space-y-3 h-full flex flex-col">
                <p className="text-gray-800 text-sm font-medium">
                  {currentContent.heading}
                </p>
                <div className="flex-1 flex flex-col justify-end space-y-2">
                  {currentContent.responses.map((response) => (
                    <Button 
                      key={response.id}
                      variant="outline"
                      size="sm"
                      onClick={handleContinue}
                      className="w-full text-left justify-start"
                    >
                      {response.text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-lg">
            <h4 className="font-semibold text-gray-900 mb-3 text-lg">{currentScene.heading}</h4>
            <p className="text-gray-800 text-sm mb-4 leading-relaxed">
              {currentContent.heading}
            </p>
            <div className="space-y-2">
              {currentContent.responses.map((response) => (
                <Button 
                  key={response.id}
                  variant="default"
                  size="sm"
                  onClick={handleContinue}
                  className="w-full"
                >
                  {response.text}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
        Scene {currentSceneIndex + 1}.{currentContentIndex + 1} of {totalScenes} scenes
      </div>
    </div>
  );
};
