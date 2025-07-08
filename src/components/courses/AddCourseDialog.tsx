import React, { useState } from "react";
import { useForm, useFieldArray, Controller, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Plus, Minus, FileText, Video, Check, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type CourseFormData = {
  title: string;
  description: string;
  category: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnailUrl: string;
  estimatedDuration: string;
  modules: {
    title: string;
    description: string;
    estimatedTime: string;
    order: number;
    lessons: {
      title: string;
      type: 'Video' | 'Article' | 'Quiz' | 'Assignment';
      content: string;
      duration: string;
      resources: string;
    }[];
  }[];
};

type AddCourseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const defaultModule = {
  title: "",
  description: "",
  estimatedTime: "",
  order: 0,
  lessons: [
    {
      title: "",
      type: "Video" as const,
      content: "",
      duration: "",
      resources: ""
    }
  ]
};

export function AddCourseDialog({ open, onOpenChange }: AddCourseDialogProps) {
  const [activeStep, setActiveStep] = useState<'course' | 'modules' | 'preview'>('course');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const methods = useForm<CourseFormData>({
    defaultValues: {
      title: "",
      description: "",
      category: [],
      level: "Beginner" as const,
      thumbnailUrl: "",
      estimatedDuration: "",
      modules: [{ ...defaultModule }]
    }
  });

  const { control, handleSubmit, watch, formState: { errors } } = methods;
  
  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control,
    name: "modules"
  });

  // Watch all form data for preview
  const formData = watch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderLessons = (moduleIndex: number) => {
    return (
      <div className="space-y-4 mt-4">
        <h4 className="text-sm font-medium">Lessons</h4>
        {methods.watch(`modules.${moduleIndex}.lessons`)?.map((_, lessonIndex) => (
          <div key={lessonIndex} className="border rounded-md p-4">
            <FormField
              control={control}
              name={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter lesson title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormField
                control={control}
                name={`modules.${moduleIndex}.lessons.${lessonIndex}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Video">
                          <div className="flex items-center">
                            <Video className="h-4 w-4 mr-2" />
                            <span>Video</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Article">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2" />
                            <span>Article</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Quiz">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>Quiz</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Assignment">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>Assignment</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name={`modules.${moduleIndex}.lessons.${lessonIndex}.duration`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 15 minutes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={control}
                name={`modules.${moduleIndex}.lessons.${lessonIndex}.content`}
                render={({ field }) => {
                  const lessonType = methods.watch(`modules.${moduleIndex}.lessons.${lessonIndex}.type`);
                  
                  return (
                    <FormItem>
                      <FormLabel>
                        {lessonType === 'Video' && 'Video URL'}
                        {lessonType === 'Article' && 'Article Content'}
                        {lessonType === 'Quiz' && 'Quiz Reference'}
                        {lessonType === 'Assignment' && 'Assignment Instructions'}
                      </FormLabel>
                      <FormControl>
                        {lessonType === 'Article' ? (
                          <Textarea placeholder="Write article content..." className="min-h-[100px]" {...field} />
                        ) : (
                          <Input 
                            placeholder={
                              lessonType === 'Video' ? "Enter video URL" : 
                              lessonType === 'Quiz' ? "Enter quiz ID" :
                              "Enter assignment details"
                            } 
                            {...field} 
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <FormField
              control={control}
              name={`modules.${moduleIndex}.lessons.${lessonIndex}.resources`}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Resources (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter resources or links" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end mt-4">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  const lessonsArray = methods.getValues(`modules.${moduleIndex}.lessons`);
                  if (lessonsArray.length > 1) {
                    const fieldArray = methods.getValues(`modules.${moduleIndex}.lessons`);
                    methods.setValue(
                      `modules.${moduleIndex}.lessons`,
                      fieldArray.filter((_, idx) => idx !== lessonIndex)
                    );
                  }
                }}
              >
                <Minus className="h-4 w-4 mr-2" />
                Remove Lesson
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const lessons = methods.getValues(`modules.${moduleIndex}.lessons`);
            methods.setValue(`modules.${moduleIndex}.lessons`, [
              ...lessons,
              {
                title: "",
                type: "Video" as const,
                content: "",
                duration: "",
                resources: ""
              }
            ]);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </Button>
      </div>
    );
  };

  const onSubmit = (data: CourseFormData) => {
    console.log("Submitting course:", data);
    toast({
      title: "Course created",
      description: "The course has been created successfully.",
    });
    methods.reset();
    onOpenChange(false);
  };

  const nextStep = () => {
    if (activeStep === 'course') setActiveStep('modules');
    else if (activeStep === 'modules') setActiveStep('preview');
  };

  const prevStep = () => {
    if (activeStep === 'preview') setActiveStep('modules');
    else if (activeStep === 'modules') setActiveStep('course');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>
            {activeStep === 'course' && 'Create New Course'}
            {activeStep === 'modules' && 'Add Course Modules'}
            {activeStep === 'preview' && 'Preview Course'}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(80vh-8rem)]">
          <div className="p-6 pt-2">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {activeStep === 'course' && (
                  <>
                    <FormField
                      control={control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter course title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter course description" className="min-h-[100px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name="level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Level</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name="estimatedDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Duration</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 10 hours" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categories/Tags (comma separated)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. Web Development, JavaScript, React" 
                              {...field}
                              value={field.value?.join(', ')} 
                              onChange={(e) => field.onChange(e.target.value.split(',').map(tag => tag.trim()))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormItem>
                      <FormLabel>Course Thumbnail</FormLabel>
                      <div className="border rounded-md p-4">
                        {imagePreview ? (
                          <div className="mb-2">
                            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
                              <img
                                src={imagePreview}
                                alt="Course thumbnail preview"
                                className="w-full h-full object-cover"
                              />
                            </AspectRatio>
                          </div>
                        ) : null}
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    </FormItem>
                  </>
                )}

                {activeStep === 'modules' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Course Modules</h3>
                    {moduleFields.map((field, index) => (
                      <Accordion
                        type="single"
                        collapsible
                        className="border rounded-md"
                        key={field.id}
                      >
                        <AccordionItem value={`module-${index}`} className="border-b-0">
                          <AccordionTrigger className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Module {index + 1}:</span>
                              <span>{methods.watch(`modules.${index}.title`) || 'Untitled Module'}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="p-4 pt-0">
                            <div className="grid gap-4">
                              <FormField
                                control={control}
                                name={`modules.${index}.title`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Module Title</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter module title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={control}
                                name={`modules.${index}.description`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Module Description</FormLabel>
                                    <FormControl>
                                      <Textarea placeholder="Enter module description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={control}
                                name={`modules.${index}.estimatedTime`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Estimated Time (optional)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g. 2 hours" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {renderLessons(index)}

                              {moduleFields.length > 1 && (
                                <div className="flex justify-end mt-2">
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeModule(index)}
                                  >
                                    <Minus className="h-4 w-4 mr-2" />
                                    Remove Module
                                  </Button>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => appendModule({ ...defaultModule, order: moduleFields.length })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Module
                    </Button>
                  </div>
                )}

                {activeStep === 'preview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {imagePreview && (
                        <div className="col-span-1">
                          <div className="overflow-hidden rounded-md border">
                            <AspectRatio ratio={16 / 9}>
                              <img
                                src={imagePreview}
                                alt="Course thumbnail"
                                className="w-full h-full object-cover"
                              />
                            </AspectRatio>
                          </div>
                        </div>
                      )}
                      <div className={cn("space-y-2", imagePreview ? "md:col-span-2" : "md:col-span-3")}>
                        <h2 className="text-2xl font-bold">{formData.title || "Untitled Course"}</h2>
                        <div className="flex gap-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {formData.level}
                          </span>
                          {formData.estimatedDuration && (
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {formData.estimatedDuration}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700">{formData.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {formData.category?.map(cat => cat.trim()).filter(Boolean).map((cat, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Course Content</h3>
                      <div className="border rounded-md">
                        {formData.modules.map((module, idx) => (
                          <Collapsible key={idx} className="border-b last:border-b-0">
                            <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left">
                              <div>
                                <div className="font-medium">Module {idx + 1}: {module.title || "Untitled Module"}</div>
                                {module.estimatedTime && (
                                  <div className="text-sm text-gray-500">{module.estimatedTime}</div>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{module.lessons.length} lessons</div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-4 pt-0 border-t">
                              <div className="pl-4 space-y-3">
                                {module.lessons.map((lesson, lessonIdx) => (
                                  <div key={lessonIdx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      {lesson.type === 'Video' && <Video className="h-4 w-4 text-blue-500" />}
                                      {lesson.type === 'Article' && <BookOpen className="h-4 w-4 text-green-500" />}
                                      {(lesson.type === 'Quiz' || lesson.type === 'Assignment') && (
                                        <FileText className="h-4 w-4 text-amber-500" />
                                      )}
                                      <span>{lesson.title || "Untitled Lesson"}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                                  </div>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </div>

                      <div className="bg-gray-50 p-4 rounded-md text-sm">
                        <pre className="overflow-x-auto">{JSON.stringify(formData, null, 2)}</pre>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </FormProvider>
          </div>
        </ScrollArea>
        <DialogFooter className="p-6 pt-2 border-t">
          {activeStep !== 'course' && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}
          
          {activeStep !== 'preview' ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit">
              <Check className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
